$(document).ready( function() {

    var url = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="
    var mese = 0;
    fAjax();
    var mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]

    $(".successivo").click( function() {
        if(mese==11) {
            
        } else {
            $(".container").empty();
            mese++;
            fAjax();
        }
    })

    $(".precedente").click( function() {
        if(mese==0) {
            
        }else {
            $(".container").empty();
            mese--;
            fAjax();
        }
    })


    function fAjax() {
        $.ajax({
            url : url+mese,
            method : "GET",
            success : function (data) {
                
                var festivita = data.response

                var source   = document.getElementById("entry-template").innerHTML;
                var template = Handlebars.compile(source);

                var numeroDiGiorni = moment('01/'+(mese+1)+'/2018', 'DD/MM/YYYY').daysInMonth();
                console.log(numeroDiGiorni);

                for(var i = 1; i <= numeroDiGiorni; i++) {
                    var currentDate = moment('2018-' +(mese+1)+ '-' + i, 'YYYY-MM-D').format('YYYY-MM-DD');
                    console.log(currentDate);
                    var currentDay = moment(currentDate).format('DD dddd');
                    console.log(currentDay);

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

                $(".mese").text(mesi[mese])

            },
            error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });
    }

})