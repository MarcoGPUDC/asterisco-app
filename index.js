var contactList = 0;
async function obtenerPedidos() {
    fetch(`/pedidos`)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
          // Init list
          contactList = new List('contacts', options);
          data.forEach(tupla => {
              contactList.add({
                  id: tupla.id,
                  name: tupla.nombre,
                  device: tupla.dispositivo,
                  motive: tupla.motivo,
                  diagnostic: tupla.diagnostico,
                  status: tupla.estado,
                  contact: tupla.contacto,
                  email: tupla.email,
                  observation: tupla.observacion,
                  nroOrder: tupla.nro_pedido
              });
        })
        } else {
          contactList = new List('contacts', options);
              data.forEach(tupla => {
                if (contactList.get('id',tupla.id).length == 0){
                  contactList.add({
                    id: tupla.id,
                    name: tupla.nombre,
                    device: tupla.dispositivo,
                    motive: tupla.motivo,
                    diagnostic: tupla.diagnostico,
                    status: tupla.estado,
                    contact: tupla.contacto,
                    email: tupla.email,
                    observation: tupla.observacion,
                    nroOrder: tupla.nro_pedido,
                    dateOrder: tupla.fecha_ingreso
                  });
                }
              });
            }
      refreshCallbacks();
    })
}



var options = {
  valueNames: [ 'id', 'name', 'device', 'dateOrder', 'motive', 'diagnostic', 'status', 'dateDeliver', 'contact', 'email', 'observation', 'nroOrder'],
  item:`<tr class="tuplaPedido"><td><imput style="display:none;" class="id"></imput><h3 class="name"></h3></td>
          <td class="device"></td>
          <td class="motive"></td>
          <td class="diagnostic"></td>
          <td class="status"></td>
          <td class="contact"></td>
          <td class="email"></td>
          <td class="observation"></td>
          <td class="nroOrder"></td>
          <td class="dateOrder"></td>
          <td class="edit"><button class="edit-item-btn button-32">Editar</button></td>
          <td class="remove"><button class="remove-item-btn button-33">Eliminar</button></td>
          <td class="send"><button class="send-item-btn button-3">Entregar</button></td>
          <td class="contact"><img class="contact-item-btn" src="./img/contact-mail.png" title="contact icons"></img></td>
        </tr>`
};



var idField = $("#id-field").hide(),
    nameField = $('#name-field'),
    deviceField = $('#device-field'),
    motiveField = $('#motive-field'),
    diagnosticField = $('#diagnostic-field'),
    statusField = $('#status-field'),
    dateDeliverField = $('#date-deliver-field'),
    contactField = $('#contact-field'),
    emailField = $('#email-field'),
    observationField = $('#observation-field'),
    nroOrderField = $('#nro-order-field'),
    allbtn = $('#todos-btn'),
    ordersbtn = $('#pedidos-btn').hide(),
    addBtn = $(`#add-btn`),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn'),
    sendBtns = $('.send-item-btn'),
    contactBtns = $('.contact-item-btn');

const regexNroOrder = /^\d{1,8}$/;

nroOrderField.on("input", function () {
  const isValid = regexNroOrder.test($(this).val());
  addBtn.prop("disabled", !isValid);

  $(this).css(
    "border",
    isValid ? "2px solid green" : "2px solid red"
  );
});


// Sets callbacks to the buttons in the list
refreshCallbacks();
obtenerPedidos();
addBtn.click(async function(){
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
    
  } catch (error) {
    console.error("Error:", error);
  }    
  clearFields();
  refreshCallbacks();
  obtenerPedidos();
});

editBtn.click(async function() {
    const values = {
      id: idField.val(),
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
    const response = await fetch("update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const result = await response.json();
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


  } catch (error) {
    console.error("Error:", error);
  }    
    clearFields();
    editBtn.hide();
    addBtn.show();
    obtenerPedidos();
});

allbtn.click(async function () {
  fetch(`/pedidosTodos`)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
          // Init list
          contactList = new List('contacts', options);
          data.forEach(tupla => {
              contactList.add({
                  id: tupla.id,
                  name: tupla.nombre,
                  device: tupla.dispositivo,
                  motive: tupla.motivo,
                  diagnostic: tupla.diagnostico,
                  status: tupla.estado,
                  contact: tupla.contacto,
                  email: tupla.email,
                  observation: tupla.observacion,
                  nroOrder: tupla.nro_pedido
              });
        })
        } else {
          contactList = new List('contacts', options);
              data.forEach(tupla => {
                if (contactList.get('id',tupla.id).length == 0){
                  contactList.add({
                    id: tupla.id,
                    name: tupla.nombre,
                    device: tupla.dispositivo,
                    motive: tupla.motivo,
                    diagnostic: tupla.diagnostico,
                    status: tupla.estado,
                    contact: tupla.contacto,
                    email: tupla.email,
                    observation: tupla.observacion,
                    nroOrder: tupla.nro_pedido,
                    dateOrder: tupla.fecha_ingreso
                  });
                }
              });
            }
      refreshCallbacks();
      allbtn.hide();
      ordersbtn.show();
    })
})

ordersbtn.click(async function (){
  contactList.clear();
  obtenerPedidos();
  ordersbtn.hide();
  allbtn.show();
})

function refreshCallbacks() {
  // Needed to add new buttons to jQuery-extended object
  removeBtns = $(removeBtns.selector);
  editBtns = $(editBtns.selector);
  sendBtns = $(sendBtns.selector);
  contactBtns = $(contactBtns.selector);

  removeBtns.click(async function() {
    var itemId = $(this).closest('tr').find('.id').text();
     try {
    const response = await fetch("remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({itemId:parseInt(itemId)})
    });

    const result = await response.json();
    contactList.remove('id', itemId);
  } catch (error) {
    console.error("Error:", error);
  }    
  });
  
  editBtns.click(function() {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
    idField.val(itemValues.id);
    nameField.val(itemValues.name);
    deviceField.val(itemValues.device);
    motiveField.val(itemValues.motive);
    diagnosticField.val(itemValues.diagnostic);
    statusField.val(itemValues.status);
    contactField.val(itemValues.contact);
    emailField.val(itemValues.email);
    observationField.val(itemValues.observation);
    nroOrderField.val(itemValues.nroOrder);
    
    editBtn.show();
    addBtn.hide();
  });

  sendBtns.click(async function () {
    var itemId = $(this).closest('tr').find('.id').text();
    try {
    const response = await fetch("send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({itemId:parseInt(itemId)})
    });
    const result = await response.json();
    contactList.remove('id', itemId);
    } catch (error) {
      console.error("Error:", error);
    }
    obtenerPedidos();
  })

  contactBtns.click(async function () {
    var itemId = $(this).closest('tr').find('.id').text();
    var itemValues = contactList.get('id', itemId)[0].values();
    abrirVentana(itemValues.contact, itemValues.email, itemValues.name, itemValues.device);
  });
}

function clearFields() {
  idField.val('');
  nameField.val('');
  deviceField.val('');
  motiveField.val('');
  diagnosticField.val('');
  statusField.val('');
  contactField.val('');
  emailField.val('');
  observationField.val('');
  nroOrderField.val('');
}

function abrirVentana(num, email, name, device) {
  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  // Ventana
  const modal = document.createElement("div");
  modal.className = "modal";
  const text = `Hola ${name}, nos contactamos desde Asterisco Redes. Queremos avisarte que tu dispositivo ${device}`
  const subject = encodeURIComponent("ACERCA DE TU DISPOSITIVO");
  const body = encodeURIComponent(
  text
);

  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  // Contenido
  modal.innerHTML = `
    <h3>Contactar a: ${name} <br>Dispositivo: ${device}</h3>
    <p>¿Qué acción desea realizar?</p>
    <div class="acciones">
      <a href="https://api.whatsapp.com/send?phone=${num}&text=${text}" target="_blank"><img id="btnMensaje" src="./img/whatsapp.png"></img></a>
      <a href=${url} target="_blank"><img id="btnCorreo" src="./img/gmail.png"></img></a>
      <button id="btnCancelar">Cancelar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Eventos
  document.getElementById("btnMensaje").onclick = () => {
    cerrarVentana();
  };

  document.getElementById("btnCorreo").onclick = () => {
    cerrarVentana();
  };

  document.getElementById("btnCancelar").onclick = cerrarVentana;

  function cerrarVentana() {
    overlay.remove();
  }
}

