var data = [];

var nohay = $("#nohay");

$(function(){

window.onload = Init();

function Init()
{
    if(JSON.parse(localStorage.getItem("data")) != null)
    {
       data = JSON.parse(localStorage.getItem("data"));
       CargarList(data);
    }else
    {
      var infnull = null;
      CargarList(null); 
    }
}

$("#btnEnviar").click(function()
{
    var usuario = {
        Id : document.getElementById("txtID").value,
        Nombre : document.getElementById("txtNombre").value,
        Apellido : document.getElementById("txtApellido").value,
        Edad : document.getElementById("txtEdad").value,
        Telefono : document.getElementById("txtTelefono").value,
        Cedular : document.getElementById("txtCedular").value
      };

      
      var f = data.filter(x => x.Id == usuario.Id);

      if(f.length == 0)
      {
        data.push(usuario);
        localStorage.setItem("data", JSON.stringify(data));
      }else{
        for(var i =0; i < data.length; i++)
        {
            if(data[i].Id == usuario.Id)
            {
               data[i].Nombre = usuario.Nombre;
               data[i].Apellido = usuario.Apellido;
               data[i].Edad = usuario.Edad;
               data[i].Telefono = usuario.Telefono;
               data[i].Cedular = usuario.Cedular;
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
      }
      Limpiar();
      CargarList(JSON.parse(localStorage.getItem("data")));
       
});

$("#btnlimpiar").click(function()
{
    Limpiar();
});

function Limpiar()
{
    document.getElementById("txtID").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtEdad").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtCedular").value = "";
    document.getElementById("txtID").focus();
}

});


function CargarList(data)
{
   if(data.length == 0)
   {    
    document.getElementById("table").innerHTML = "";
    nohay.css("display","block");
   }else{
       
    nohay.css("display","none");

    var cont = data.length;
    var thead = Object.keys(data[0]);

    var contenido = "";
    contenido += "<thead>";
    contenido += "<tr>";
    for(var t = 0; t < thead.length; t++)
    {
       contenido += "<th>";
       contenido += thead[t];
       contenido += "</th>";
    }
    contenido += "<th>Edit</th>";
    contenido += "<th>Delete</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    
    contenido += "<tbody>";
    for(var i = 0; i < cont; i++)
    {
        contenido += "<tr>";
        for(var j = 0; j < thead.length; j++)
        {
            var fila = thead[j];

            contenido += "<td>";
            contenido += data[i][fila];
            contenido += "</td>";
        }
        contenido += "<td><button type='button' class='btn btn-warning' onclick='Get("+data[i][thead[0]]+")'><i class='far fa-edit'></i></button></td>";
        contenido += "<td><button type='button' class='btn btn-danger'  onclick='Eliminar("+data[i][thead[0]]+")'><i class='fa fa-trash' aria-hidden='true'></i></button></td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";

    document.getElementById("table").innerHTML = contenido;
   }
}

function Get(id)
{
    var f = data.filter(x => x.Id == id);

    for(var i = 0; i < f.length; i++)
    {
        document.getElementById("txtID").value = f[i].Id;
        document.getElementById("txtNombre").value = f[i].Nombre;
        document.getElementById("txtApellido").value = f[i].Apellido;
        document.getElementById("txtEdad").value = f[i].Edad;
        document.getElementById("txtTelefono").value = f[i].Telefono;
        document.getElementById("txtCedular").value = f[i].Cedular;
    }


    document.getElementById("txtID").focus();
}

function Eliminar(Id)
{
   if(confirm("Estas Seguro de Eliminar Esta Persona"))
   {
    var f = data.findIndex(x => x.Id == Id);

    data.splice(f, 1);

    localStorage.setItem("data", JSON.stringify(data));

    CargarList(JSON.parse(localStorage.getItem("data")));
   }else{
    document.getElementById("txtID").focus();
   }
}

function Filtrar()
{
    var inf = document.getElementById("txtBuscar").value;

    if(inf != "")
    {
        var f = data.filter(x => x.Nombre == inf);
        CargarList(f);
    }else{
        CargarList(JSON.parse(localStorage.getItem("data")));
    }
}