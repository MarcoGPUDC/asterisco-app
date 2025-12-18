
var contactList = 0;
console.log(contactList)
async function obtenerPedidos() {
    fetch('/pedidos')
    .then(res => res.json())
    .then(data => {        
        if (data.length !== 0) {
          // Init list
          contactList = new List('contacts', options);
          data.forEach(tupla => {
            contactList.add({
                id: tupla.id,
                name: tupla.nombre,
                device: tupla.dispositivo,
            });
        })
        } else {
          console.log("No hay solicitudes")
        }
        
    })
}


var options = {
  valueNames: [ 'id', 'name', 'device', 'dateOrder', 'motive', 'diagnostic', 'status', 'dateDeliver', 'contact', 'email', 'observation', 'nroOrder'],
  item:`<tr><td><h3 class="name"></h3></td>
          <td class="device"></td>
          <td class="motive"></td>
          <td class="diagnostic"></td>
          <td class="status"></td>
          <td class="contact"></td>
          <td class="email"></td>
          <td class="observation"></td>
          <td class="nroOrder"></td>
          <td class="dateOrder"></td>
        </tr>`
};



var idField = $("#id-field").hide(),
    nameField = $('#name-field'),
    deviceField = $('#device-field'),
    dateOrderField = $('#date-order-field'),
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
addBtn.click(async function(){
  if (contactList == 0){
    const values = {
      name: nameField.val(),
      device: deviceField.val(),
      motive: motiveField.val(),
      diagnostic: diagnosticField.val(),
      contact: contactField.val(),
      email: emailField.val(),
      observation: observationField.val(),
      nroOrder: nroOrderField.val()
    };
    try {
    const response = await fetch("add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.error("Error:", error);
  }
    contactList = new List('contacts', options, [values]);
  } else {
    console.log(contactList.length)
    contactList.add({
        name: nameField.val(),
        device: deviceField.val(),
        motive: motiveField.val(),
        diagnostic: diagnosticField.val(),
        contact: contactField.val(),
        email: emailField.val(),
        observation: observationField.val(),
        nroOrder: nroOrderField.val() 
    });
  }
    
  clearFields();
  refreshCallbacks();
});

editBtn.click(function() {
    var item = contactList.get('id', idField.val())[0];
    item.values({
        name: nameField.val(),
        device: deviceField.val(),
        motive: motiveField.val(),
        diagnostic: diagnosticField.val(),
        contact: contactField.val(),
        email: emailField.val(),
        observation: observationField.val(),
        nroOrder: nroOrderField.val() 
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
    nameFieldid.val(itemValues.name);
    deviceFieldid.val(itemValues.device);
    dateOrderField.val(itemValues.dateOrder);
    motiveField.val(itemValues.motive);
    diagnosticField.val(itemValues.diagnostic);
    statusField.val(itemValues.status);
    dateDeliverFiel.val(itemValues.dateDeliver);
    contactField.val(itemValues.contact);
    emailField.val(itemValues.email);
    observationField.val(itemValues.observation);
    nroOrderField.val(itemValues.nroOrder);
    
    editBtn.show();
    addBtn.hide();
  });
}

function clearFields() {
  idField.val('');
  nameField.val('');
  deviceField.val('');
  dateOrderField.val('');
  motiveField.val('');
  diagnosticField.val('');
  statusField.val('');
  dateDeliverField.val('');
  contactField.val('');
  emailField.val('');
  observationField.val('');
  nroOrderField.val('');
}