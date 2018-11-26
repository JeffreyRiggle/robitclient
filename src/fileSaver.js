const save = (data, type, fileName) => {
    let el = document.createElement('a');

    el.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(data)}`);
    el.setAttribute('download', fileName);

    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

export {
   save
}