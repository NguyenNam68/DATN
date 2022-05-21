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

// const btnEdits = document.querySelectorAll('.table-data__edit');
// const modalEdit = document.querySelector('.js-modal-edit');
// const modalEditClose = document.querySelector('.js-modal-close-edit');
// const modalInputs = document.querySelectorAll('.modal-edit');

// const table = document.querySelector('.table-data__content');

// for(let i = 0; i < btnEdits.length; i++){
//     btnEdits[i].onclick = () =>{
//         modalInputs[0].value = btnEdits[i].id;
//         for(let j = 0; j < table.rows[i+1].cells.length - 1; j++){
//             for(let k = 0; k < modalInputs.length-1; k++){
//                 modalInputs[k+1].value = table.rows[i+1].cells[k].innerText.substring();
//             }
//         }
//         modalEdit.style.display = 'block';
//     }
// }

// modalEditClose.onclick = () =>{
//     modalEdit.style.display = 'none';
// }