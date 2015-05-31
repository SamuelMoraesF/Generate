$(document).foundation({
  offcanvas : {
    open_method: 'move', 
    close_on_click : true
  }
});


$('.sectionshow a').click(function(){    
    $('.main-section .tab').hide();
    $(".tab-bar-section h1").html($(this).data( "show" ).substring(1).toUpperCase())
    $($(this).data( "show" )).show();
})

//$('.tab .value').mask();

function remval(){
	$(".tab h1.info").removeClass("invalid").removeClass("valid");
	$(".tab .value").removeClass("valid").removeClass("invalid")
}

$("#rg .generate").click(function(){
	gerarRG();
})

$("#cpf .generate").click(function(){
	gerarCPF();
})

$("#cnpj .generate").click(function(){
	gerarCNPJ();
})

$("#rg .validate").click(function(){
	vrg($("#rg .value").val())
})

$("#cpf .validate").click(function(){
	vcpf($("#cpf .value").val())
})

$("#cnpj .validate").click(function(){
	vcnpj($("#cnpj .value").val())
})


/*

	CPF

 */


// From: http://www.gerardocumentos.com.br/?pg=funcao-javascript-para-validar-cpf
// From: http://www.gerardocumentos.com.br/?pg=funcao-javascript-para-gerar-cpf

function valida_cpf(cpf){
	cpf = cpf.replace(/\D+/g, '')
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)){
            digitos_iguais = 0;
            break;
        }
        if (!digitos_iguais){
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        } else {
            return false;
        }
}

function vcpf(number){

	valido = valida_cpf(number)

	if (valido == false){
		$("#cpf h1.info").html("INVÁLIDO");
		$("#cpf h1.info").removeClass("valid");
		$("#cpf h1.info, #cpf .value").addClass("invalid");
	} else {
		$("#cpf h1.info").html("VÁLIDO");
		$("#cpf h1.info").removeClass("invalid");
		$("#cpf h1.info, #cpf .value").addClass("valid");
	}

}

function randomiza(n) {
	var ranNum = Math.round(Math.random()*n);
	return ranNum;
}
			
function mod(dividendo,divisor) {
	return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}
			
function gerarCPF() {
	comPontos = true; // TRUE para ativar e FALSE para desativar a pontuação.
		  
	var n = 9;
	var n1 = randomiza(n);
	var n2 = randomiza(n);
	var n3 = randomiza(n);
	var n4 = randomiza(n);
	var n5 = randomiza(n);
	var n6 = randomiza(n);
	var n7 = randomiza(n);
	var n8 = randomiza(n);
	var n9 = randomiza(n);
	var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
	d1 = 11 - ( mod(d1,11) );
	if (d1>=10) d1 = 0;
	var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
	d2 = 11 - ( mod(d2,11) );
	if (d2>=10) d2 = 0;
	retorno = '';
	if (comPontos) cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
	else cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
			
	$('#cpf .value').val(cpf);
}

/*

	CNPJ

*/

// From: http://www.scriptbrasil.com.br/forum/topic/156923-gerador-de-cpf-e-cnpj/
// From: http://www.geradorcnpj.com/javascript-validar-cnpj.htm

function gerarCNPJ(){
        var n = 9;
        var n1  = randomiza(n);
        var n2  = randomiza(n);
        var n3  = randomiza(n);
        var n4  = randomiza(n);
        var n5  = randomiza(n);
        var n6  = randomiza(n);
        var n7  = randomiza(n);
        var n8  = randomiza(n);
        var n9  = 0;//randomiza(n);
        var n10 = 0;//randomiza(n);
        var n11 = 0;//randomiza(n);
        var n12 = 1;//randomiza(n);
        var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
        d1 = 11 - ( mod(d1,11) );
        if (d1>=10) d1 = 0;
        var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
        d2 = 11 - ( mod(d2,11) );
        if (d2>=10) d2 = 0;
        $('#cnpj .value').val(''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2);
}


function valida_cnpj(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function vcnpj(number){

	valido = valida_cnpj(number)

	if (valido == false){
		$("#cnpj h1.info").html("INVÁLIDO");
		$("#cnpj h1.info").removeClass("valid");
		$("#cnpj h1.info, #cnpj .value").addClass("invalid");
	} else {
		$("#cnpj h1.info").html("VÁLIDO");
		$("#cnpj h1.info").removeClass("invalid");
		$("#cnpj h1.info, #cnpj .value").addClass("valid");
	}

}


/*

	RG

*/

// From: http://www.gerardocumentos.com.br/functions.js

function gerarRG(){
	
	num_rg = 4;
	rg1 = new Array (num_rg);
	rg2 = new Array (num_rg);
	
	rg2[0]  = '911225341';
	rg2[1]  = '403289440';
	rg2[2]  = '418757896';
	rg2[3]  = '2977269';
	rg2[4] = '429434121';

	$('#rg .value').val(rg2[randomiza(num_rg)]);

}

function valida_rg(numero){
	var numero = numero.split("");
	tamanho = numero.length;
	vetor = new Array(tamanho);
	
	if(tamanho>=1)
	{
	 vetor[0] = parseInt(numero[0]) * 2; 
	}
	if(tamanho>=2){
	 vetor[1] = parseInt(numero[1]) * 3; 
	}
	if(tamanho>=3){
	 vetor[2] = parseInt(numero[2]) * 4; 
	}
	if(tamanho>=4){
	 vetor[3] = parseInt(numero[3]) * 5; 
	}
	if(tamanho>=5){
	 vetor[4] = parseInt(numero[4]) * 6; 
	}
	if(tamanho>=6){
	 vetor[5] = parseInt(numero[5]) * 7; 
	}
	if(tamanho>=7){
	 vetor[6] = parseInt(numero[6]) * 8; 
	}
	if(tamanho>=8){
	 vetor[7] = parseInt(numero[7]) * 9; 
	}
	if(tamanho>=9){
	 vetor[8] = parseInt(numero[8]) * 100; 
	}
	
	 total = 0;
	
	if(tamanho>=1){
	 total += vetor[0];
	}
	if(tamanho>=2){
	 total += vetor[1]; 
	}
	if(tamanho>=3){
	 total += vetor[2]; 
	}
	if(tamanho>=4){
	 total += vetor[3]; 
	}
	if(tamanho>=5){
	 total += vetor[4]; 
	}
	if(tamanho>=6){
	 total += vetor[5]; 
	}
	if(tamanho>=7){
	 total += vetor[6];
	}
	if(tamanho>=8){
	 total += vetor[7]; 
	}
	if(tamanho>=9){
	 total += vetor[8]; 
	}
	
	resto = total % 11;
	 
	if (resto!=0)
		return false
	else
		return true
}

function vrg(number){

	valido = valida_rg(number)

	if (valido == false){
		$("#rg h1.info").html("INVÁLIDO");
		$("#rg h1.info").removeClass("valid");
		$("#rg h1.info, #rg .value").addClass("invalid");
	} else {
		$("#rg h1.info").html("VÁLIDO");
		$("#rg h1.info").removeClass("invalid");
		$("#rg h1.info, #rg .value").addClass("valid");
	}

}