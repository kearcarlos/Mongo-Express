recibirMesas();

function recibirMesas(){
    fetch("api/mesas").then(function(res){
        return res.json()
    }).then(function(datos){
        let mesas="";
        for(let i=0; i<datos.length; i++){
            mesas+=`
                <div>
                    <p>Tamaño: ${datos[i].tamanyo}</p>
                    <p>Color: ${datos[i].color}</p>
                    <p>Material: ${datos[i].material}</p>
                    <p>Patas: ${datos[i].patas}</p>
                
                </div>
            `;
        }
        document.getElementById("div1").innerHTML=mesas;
    });
}




function anyadir(){
    const tamanyo=document.getElementById("tamanyo").value;
    const color=document.getElementById("color").value;
    const material=document.getElementById("material").value;
    const patas=document.getElementById("patas").value;

    const mesa={
        tamanyo,
        color,
        material,
        patas,
    };

    fetch("/api/anyadir",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mesa),
    }).then(function(res){
        return res.json()
    }).then(function(datos){
        console.log(datos);
        recibirMesas();
    });
}



function cambiarColor(){
    const color = document.getElementById("cambiarColor").value;

    fetch(`/api/modificar/${color}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(function(res){
        return res.json();
    }).then(function(datos){
        console.log(datos);
        recibirMesas();
      });
  }



  function borrarPatas(){
    const patas=document.getElementById("borrarPatas").value;

    fetch(`/api/borrar/${patas}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).then(function(res){
          return res.json();
      }).then(function(datos){
          console.log(datos);
          recibirMesas();
        });
    }