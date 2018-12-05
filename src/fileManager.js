const save = (data, type, fileName) => {
    let el = document.createElement('a');

    el.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(data)}`);
    el.setAttribute('download', fileName);

    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

const load = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            if (e.currentTarget.error) {
                reject('Failed to read file');
                return;
            }
    
            resolve(e.currentTarget.result);
        }
    
        reader.readAsText(file);
    });
}

export {
   save,
   load
}