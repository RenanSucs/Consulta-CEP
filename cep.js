//Jquery wrapper = embrulha o código por segurança
$(function(){
    //ações
    var onlyNumbers = function(){
        //console.log(e.target.value); verifica o que está sendo passado dentro do input e retorna.
        //console.log(this.value); this aponta para o objeto contexto da execução, no caso o #cep(mesma coisa que o de cima,mas nao precisa do (e) na função)
        this.value = this.value.replace(/\D/g,""); // /\D/g = /g faz com que todos os numeros fiquem valor vazio(como se fosse um laço de repetição)
    }

    var validateEntry = function(){
        var cep = this.value;
        console.log(cep);
        if(cep.length === 8){
            $(this).removeClass("error");
            getAdress(cep);
        }else {
            $(this).addClass("error");
        }
    }

    var getAdress = function(cep){
        $.ajax({
            url:"https://viacep.com.br/ws/"+cep+"/json/",
            dataType:"json",
            error: getAddressError,
            success: getAddressSuccess
        });
    }

    var getAddressError = function(){
        console.error("Falhou!");
    }

    var getAddressSuccess = function(data){
        console.log(data);
        $("#logradouro").val(data.logradouro);
        $("#bairro").val(data.bairro);
        $("#cidade").val(data.localidade);
        $("#estado").val(data.uf);
    }

    //eventos
    $("#cep")
    .on("input", onlyNumbers)
    .on("focusout", validateEntry);

});