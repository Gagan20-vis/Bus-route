const searchFun = () => {
    let filter = document.getElementById('myinput').value.toUpperCase();

    let myTable = document.getElementById('myTable');

    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[2];

        let textvalue = td.textContent || td.innerHTML;

        if (td) {
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//add data modal
const add_data = document.getElementById('add_btn');
add_data.addEventListener('click', function () {
    OpenBootstrapPopup();
});

function OpenBootstrapPopup() {
    $("#action_modal").modal('show');
}

//update data modal
const update_data = document.getElementsByClassName('edit_btn');

let myFunction2 = () => {
    $('#update_modal').modal('show');
}
for (let index = 0; index < update_data.length; index++) {
    update_data[index].addEventListener('click', myFunction2, false);

}