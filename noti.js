function push(){

    Push.Permission.request();

    Push.create('Activaste la notificacion', {

    body: 'Ejucataste la notificacion push',

    icon: "img/icon_64",

    timeout: 1500000,              

    vibrate: [100, 100, 100],    

    onClick: function() {

       

        window.location="https://google.es";

 

        console.log(this);

    }  

});

  }