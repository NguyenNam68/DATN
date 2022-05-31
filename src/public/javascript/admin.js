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

// const btnDetails = document.querySelectorAll('.table-data__detail');
// const modalDetail = document.querySelector('.js-modal-detail');
// const modalDetailClose = document.querySelector('.js-modal-close-detail');
// // const modalInputs = document.querySelectorAll('.modal-detail');

// const table = document.querySelector('.table-data__content');

// for(let i = 0; i < btnDetails.length; i++){
//     btnDetails[i].onclick = () =>{
//         for(let j = 0; j < table.rows[i+1].cells.length - 1; j++){
//             for(let k = 0; k < modalInputs.length-1; k++){
//                 modalInputs[k+1].value = table.rows[i+1].cells[k].innerText.substring();
//             }
//         }
//         modalDetail.style.display = 'block';
//     }
// }

// modalEditClose.onclick = () =>{
//     modalEdit.style.display = 'none';
// }