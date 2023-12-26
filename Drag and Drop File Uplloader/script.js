document.addEventListener('DOMContentLoaded', () => {
    const uploaderContainer = document.getElementById('uploaderContainer');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    uploaderContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploaderContainer.classList.add('dragover');
    });

    uploaderContainer.addEventListener('dragleave', () => {
        uploaderContainer.classList.remove('dragover');
    });

    uploaderContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploaderContainer.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (const file of files) {
            saveFile(file);
        }
        displayFileList();
    }

    function saveFile(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            localStorage.setItem(file.name, fileContent);
        };

        reader.readAsText(file);
    }

    function displayFileList() {
        fileList.innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
            const fileName = localStorage.key(i);
            const fileContent = localStorage.getItem(fileName);
            const listItem = document.createElement('div');
            listItem.classList.add('file-list-item');

            // Display file name and type
            const fileType = getFileType(fileContent);
            listItem.innerHTML = `<strong>${fileName}</strong> (${fileType})`;

            // Display file preview
            const filePreview = getFilePreview(fileContent);
            if (filePreview) {
                const previewImage = document.createElement('img');
                previewImage.src = filePreview;
                previewImage.alt = 'File Preview';
                previewImage.classList.add('file-preview');
                listItem.appendChild(previewImage);
            }

            fileList.appendChild(listItem);
        }
    }

    function getFileType(fileContent) {
        const typeMatch = fileContent.match(/data:(.*?);/);
        return typeMatch ? typeMatch[1] : 'Unknown Type';
    }

    function getFilePreview(fileContent) {
        const typeMatch = getFileType(fileContent);
        if (typeMatch.startsWith('image')) {
            return fileContent;
        }
        return null;
    }
});
