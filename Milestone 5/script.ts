document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        
        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

            const nameElement = document.getElementById('name') as HTMLInputElement;
            const emailElement = document.getElementById('email') as HTMLInputElement;
            const phoneElement = document.getElementById('phone') as HTMLInputElement;
            const educationElement = document.getElementById('education') as HTMLTextAreaElement;
            const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
            const skillElement = document.getElementById('skills') as HTMLTextAreaElement;


         const usernameElement = document.getElementById(
            "username"
         ) as HTMLInputElement;



            // Log the elements to check if they are correctly selected
            console.log('nameElement:', nameElement);
            console.log('emailElement:', emailElement);
            console.log('phoneElement:', phoneElement);
            console.log('educationElement:', educationElement);
            console.log('experienceElement:', experienceElement);
            console.log('skillElement:', skillElement);

            if ( usernameElement && profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement) {



              



                const name = nameElement.value.trim();
                const email = emailElement.value.trim();
                const phone = phoneElement.value.trim();
                const education = educationElement.value.trim();
                const experience = experienceElement.value.trim();
                const skill = skillElement.value.trim();



             const username = usernameElement.value;
             const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`


            // picture Elements
            const profilePictureFile = profilePictureInput.files?.[0]
            const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";



                const resumeOutput = `
                    <h2>Resume</h2>
                    ${profilePictureURL ? `<img src=${profilePictureURL} alt="Profile Picture" class="profilePicture">` : ""}
                    <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
                    <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
                    <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
                    <h3>Education</h3>
                    <p id="edit-education" class="editable">${education}</p>
                    <h3>Experience</h3>
                    <p id="edit-experience" class="editable">${experience}</p>
                    <h3>Skills</h3>
                    <p id="edit-skill" class="editable">${skill}</p>
                `;



              const downloadLink = document.createElement('a')
              downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput)
              downloadLink.download = uniquePath;
              downloadLink.textContent = 'Download your 2024 resume ';







                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    resumeOutputElement.classList.remove("hidden");


                 const buttonsContainer = document.createElement("div");
                 buttonsContainer.id = "button container";
                 resumeOutputElement.appendChild(buttonsContainer);



                    const downloadButton = document.createElement("button");
                    downloadButton.textContent = "Download as PDF";
                    downloadButton.addEventListener("click" , () => {
                        window.print();
                    });
                    buttonsContainer.appendChild(downloadButton);


                 const shareLinkButton = document.createElement("button");
                 shareLinkButton.textContent = "Copy Shareable link";
                 shareLinkButton.addEventListener("click" , async () => {
                    try{
                        const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                            /\s+/g,
                            "_"
                        )}_cv.html`;

                        await navigator.clipboard.writeText(shareableLink);
                        alert ("Shareable link copies to clipborad!");
                    }catch (err) {
                        console.error("Failed to copy link:",err)
                        alert("Failed to copy link to clipboard. please try again.");

                    }
                 });




                  resumeOutputElement.appendChild(downloadLink)





                    makeEditable();
                }
            } else {
                console.error('One or more form elements are missing');
            }
        });
    }
});


// <-- Make sure this closing bracket is here


function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content with input
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                const saveContent = () => {
                    currentElement.textContent = input.value.trim();
                    currentElement.style.display = 'inline';
                    input.remove();
                };

                input.addEventListener('blur', saveContent);
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') saveContent();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}

