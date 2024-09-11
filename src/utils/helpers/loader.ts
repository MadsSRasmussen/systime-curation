export async function getFilecontentFromFileInput(): Promise<string> {

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.can');
    input.style.display = 'none';
    document.body.appendChild(input);

    // Clicks the input and awaits a change, to return contents of that file.
    const fileContent = await new Promise<string>((resolve, reject) => {

        input.addEventListener('change', (e) => {

            const target = e.target as HTMLInputElement

            if (target.files) {
                if (target.files.length < 1) throw Error('No files selected');
                const file = target.files[0];
                
                const reader = new FileReader();
                
                reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
                    const content = readerEvent.target?.result as string;
                    resolve(content)
                }
                
                reader.readAsText(file);
            } else {
                reject();
            }

        })

        input.click();

    })

    input.remove();
    return fileContent;

}