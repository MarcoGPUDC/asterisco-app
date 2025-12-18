
console.log('js cargado')
async function obtenerPedidos() {
    fetch('pedidos')
    .then(res => res.json())
    .then(data => {
        data.forEach(tupla => {
            contactList.add({
                id: tupla.id,
                name: tupla.nombre,
                device: tupla.dispositivo,
            });
        })
    })
}


var options = {
  valueNames: [ 'id', 'name', 'device', 'date-order', 'motive', 'diagnostic', 'status', 'date-deliver', 'contact', 'email', 'observation', 'nro-order' ]
};

// Init list
var contactList = new List('contacts', options);

var idField = $("#id-field"),
    nameField = $('#name-field'),
    ageField = $('#device-field'),
    cityField = $('#date-order-field'),
    motiveField = $('#motive-field'),
    diagnosticField = $('#diagnostic-field'),
    statusField = $('#status-field'),
    dateDeliverField = $('#date-deliver-field'),
    contactField = $('#contact-field'),
    emailField = $('#email-field'),
    observationField = $('#observation-field'),
    nroOrderField = $('#nro-order-field'),
    addBtn = $(`#add-btn`),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');

// Sets callbacks to the buttons in the list
refreshCallbacks();
obtenerPedidos();
console.log(addBtn);
addBtn.click(function(){
    contactList.add({
        id: Math.floor(Math.random()*110000),
        name: nameField.val(),
        age: ageField.val(),
        city: cityField.val()
    });
  clearFields();
  refreshCallbacks();
});

editBtn.click(function() {
    var item = contactList.get('id', idField.val())[0];
    item.values({
        id:idField.val(),
        name: nameField.val(),
        age: ageField.val(),
        city: cityField.val()
    });
    clearFields();
    editBtn.hide();
    addBtn.show();
});

function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(removeBtns.selector);
  editBtns = $(editBtns.selector);
  
  removeBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    contactList.remove('id', itemId);
  });
  
  editBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    ageField.val(itemValues.age);
    cityField.val(itemValues.city);
    
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  nameField.val('');
  ageField.val('');
  cityField.val('');
}