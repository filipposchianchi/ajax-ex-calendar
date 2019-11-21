$(document).ready( function() {

    // var source   = document.getElementById("entry-template").innerHTML;
    // var template = Handlebars.compile(source);

    // var numeroDiGiorni = moment('01/01/2018', 'DD/MM/YYYY').daysInMonth();

    // for(var i = 1; i <= numeroDiGiorni; i++) {

    //     var currentDate = moment('2018-01-' + i, 'YYYY-MM-D').format('YYYY-MM-DD');


    //     var currentDay = moment(currentDate).format('DD dddd');

    //     var context = {data: currentDay};
    //     var html    = template(context);

    //     $(".container").append(html);
    // }

    $.ajax({
        url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method : "GET",
        success : function (data) {
            var festivita = data.response

            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);

            var numeroDiGiorni = moment('01/01/2018', 'DD/MM/YYYY').daysInMonth();

            for(var i = 1; i <= numeroDiGiorni; i++) {
                var currentDate = moment('2018-01-' + i, 'YYYY-MM-D').format('YYYY-MM-DD');
                var currentDay = moment(currentDate).format('DD dddd');

                context = {data: currentDay};

                var html = template(context);
                $('.container').append('<div data-date="'+currentDate+'">'+ html +'</div>')
            }

            for (var i = 0; i < festivita.length; i++){
                var oggetto = festivita[i];

                var nomefesta = oggetto.name;
                var datafesta = oggetto.date;


                var elementoSelez = $("div[data-date='" + datafesta + "']");
                console.log(elementoSelez);

                if(elementoSelez){
                      elementoSelez.addClass("red").append(" - " + nomefesta);
                }
            }



            // for(var i = 1; i <= numeroDiGiorni; i++) {

            //     var currentDate = moment('2018-01-' + i, 'YYYY-MM-D').format('YYYY-MM-DD');
            //     var currentDay = moment(currentDate).format('DD dddd');
               
            //     var inserito=false

            //     for (var j = 0; j< numeroGiorniFestivi; j++) {
                    
            //         var context;

            //         if(currentDate == festivita[j].date && inserito == false ){
            //             console.log(currentDate, festivita[j].date, j, "uguali")
            //             context = {data: currentDay + " - " + festivita[j].name, colore: "red"};
            //             inserito = true;

            //         } else if (inserito ===false) {
            //             console.log(currentDate, festivita[j].date, j, "diversi")
            //             context = {data: currentDay, colore: "black"};
            //         }

            //         var html = template(context);
            //         $(".container").append(html);
                    

            //     }
                

            //     // if(currentDate === festivita[0].date){
            //     //     console.log(currentDate, "uguale", festivita[0].date)
            //     //     var currentDay = moment(currentDate).format('DD dddd');
            //     //     var context = {data: currentDay + " - " + festivita[0].name, colore: "red"};
            //     //     var html = template(context);
            //     //     $(".container").append(html);

            //     // } else if (currentDate === festivita[1].date) {
            //     //     console.log(currentDate, "uguale", festivita[1].date)
            //     //     var currentDay = moment(currentDate).format('DD dddd');
            //     //     var context = {data: currentDay + " - " + festivita[1].name, colore: "red"} ;
            //     //     var html = template(context);
            //     //     $(".container").append(html);

            //     // } else {
            //     //     var currentDay = moment(currentDate).format('DD dddd');
            //     //     var context = {data: currentDay, colore: "black"};
            //     //     var html = template(context);
            //     //     $(".container").append(html);

            //     // }


            // }


        },
        error : function (errore) {
            alert("E' avvenuto un errore. "+errore);
        }
    });

})