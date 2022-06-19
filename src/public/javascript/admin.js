if(location.pathname !=='/admin' && location.pathname !=='/admin/post/list'){
    //BUTTON ADD&EDIT

    const btnAdd = document.querySelector('.btn__add');
    const modalAdd = document.querySelector('.js-modal');
    const modalAddClose = document.querySelector('.js-modal-close');

    btnAdd.onclick = () =>{
        modalAdd.style.display = 'block';
    }

    modalAddClose.onclick = () =>{
        modalAdd.style.display = 'none';
    }
}

if(location.pathname == '/admin/post/list'){
    const btnDetails = document.querySelectorAll('.table-data__detail');
    const modalDetail = document.querySelector('.js-modal-detail');
    const modalDetailClose = document.querySelector('.js-modal-close-detail');

    for(let i = 0; i < btnDetails.length; i++){
        btnDetails[i].onclick = () =>{
            const detail = btnDetails[i].parentElement;
            const modalContent = document.querySelector('.modal-content');
            const modalTitle = document.querySelector('.modal-title');
            modalContent.innerHTML = detail.querySelector('.contentPost').innerText;
            modalTitle.innerHTML = detail.querySelector('.titlePost').innerText;
            modalDetail.style.display = 'block';
        }
    }

    modalDetailClose.onclick = () =>{
        modalDetail.style.display = 'none';
}
}

function previewUpload(e){
    var preview = document.getElementById('imagePreview');
    preview.src = URL.createObjectURL(e.target.files[0]);
    var textImage = document.getElementById('labelImage');
    textImage.innerText = e.target.files[0].name;
    preview.onload = () => {
        URL.revokeObjectURL(preview.src);
    }
}