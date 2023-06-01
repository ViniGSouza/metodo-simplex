function condicaoParada(matriz) {
	var i = matriz.length - 1;

	for (j = 1; j < matriz[i].length; j++) {
		if (matriz[i][j] > 0) {
			return true;
		}
	}
	return false;
}

function calcMatriz(matriz) {
	var nLinhas = matriz.length - 1;
	var nColunas = matriz[nLinhas].length - 1;


	var maior = matriz[nLinhas][1];
	indMaior = 1;
	for (j = 2; j <= nColunas; j++) {
		if (matriz[nLinhas][j] > maior) {
			maior = matriz[nLinhas][j];
			indMaior = j;
		}
	}

	var menor = Number.MAX_VALUE;
	var indMenor = 0;
	for (k = 1; k < nLinhas; k++) {
		var teste = matriz[k][nColunas] / matriz[k][indMaior];
		if (matriz[k][indMaior] != 0 && teste < menor && teste >= 0 ) { 
			menor = matriz[k][nColunas] / matriz[k][indMaior];
			indMenor = k;
		}
	}
	var v_in = matriz[0][indMaior];
	var v_out = matriz[indMenor][0];
	document.getElementById("tab").innerHTML+="<p>Troca VB: entra "+v_in.substr(0,1)+"<sub>"+v_in.substr(1,1)+"</sub> e sai "+v_out.substr(0,1)+"<sub>"+v_out.substr(1,1)+"</sub></p>";
	matriz[indMenor][0] = matriz[0][indMaior];
	
	printTabela(matriz);
	
	var aux = matriz[indMenor][indMaior];
	if (aux != 1) {
		for (l = 1; l <= nColunas; l++) {
			matriz[indMenor][l] = matriz[indMenor][l] / aux;
		}
		var fracao = new Fraction(1/aux);
		var numFormatado = fracao.toFraction();
		document.getElementById("tab").innerHTML+="<p>Linha "+indMenor+" = Linha "+indMenor+" * "+numFormatado+"</p>";
		printTabela(matriz);
	}

	
	for (i = 1; i <= nLinhas; i++) {
		var aux = matriz[i][indMaior];
		if (i != indMenor && aux != 0) {
			for (j = 1; j <= nColunas; j++) {
				matriz[i][j] = parseFloat(matriz[i][j]) + parseFloat(-1 * aux * matriz[indMenor][j]);
			}
			var fracao = new Fraction(-1*aux);
			var numFormatado = fracao.toFraction();
			document.getElementById("tab").innerHTML+="<p>Linha "+i+" = Linha "+i+" + ("+numFormatado+") * Linha "+indMenor+"</p>";
			printTabela(matriz);
		}
	}
}

//bloqueia edição nos inputs
function esconder(variaveis, restricoes) {
	for (i = 1; i <= variaveis; i++) {
		document.getElementById('y'+i).style = "-moz-appearance:textfield;";
		document.getElementById('y'+i).style.border = "0";
		document.getElementById('y'+i).readOnly = true;
		for (j = 1; j <= restricoes; j++) {
			document.getElementById('x'+j+i).style = "-moz-appearance:textfield;";
			document.getElementById('x'+j+i).style.border = "0";
			document.getElementById('x'+j+i).readOnly = true;
		}
	}
	for (j = 1; j <= restricoes; j++) {
		document.getElementById('b'+j).style = "-moz-appearance:textfield;";
		document.getElementById('b'+j).style.border = "0";
		document.getElementById('b'+j).readOnly = true;
	}
}

function validarCoeficientes(variaveis, restricoes) {
	for (i = 1; i <= variaveis; i++) {
		if (document.getElementById('y'+i).value == "") {
			document.getElementById('y'+i).focus();
			alert('Informe os valores de todos os coeficientes.');
			return 1;
		}
		for (j = 1; j <= restricoes; j++) {
			if (document.getElementById('x'+j+i).value == "") {
				document.getElementById('x'+j+i).focus();
				alert('Informe os valores de todos os coeficientes.');
				return 1;
			}
		}
	}
	for (j = 1; j <= restricoes; j++) {
		if (document.getElementById('b'+j).value == "") {
			document.getElementById('b'+j).focus();
			alert('Informe os valores de todas as constantes.');
			return 1;
		}
	}
}

function atualizar() {
	window.location.href='simplex.html';
}

function criarForm(variaveis, restricoes) {
	
	if (variaveis == "" || variaveis <= 0 || variaveis != parseInt(variaveis)) {
		alert('Preencha o campo com a quantidade de variáveis.');
		form1.variaveis.focus();
		return;
	} else {
		if (restricoes == "" || restricoes <= 0 || restricoes != parseInt(restricoes)) {
			alert('Preencha o campo com a quantidade de restrições.');
			form1.regras.focus();
			return;
		}
	}
	if (variaveis > 0 && restricoes > 0) {
		document.getElementById("form1").style.display = 'none';
		document.getElementById("form2").style.display = 'block';
		document.getElementById("aqui").innerHTML+="<span>Z = </span>";
		document.getElementById("aqui").innerHTML+="<input type='number' class='inputZ' required autocomplete='off' size='5' maxlength='10' step='0.1' id='y1' name='y1' />x<sub>1</sub>";
		for (var h = 2; h <= variaveis; h++) {
			document.getElementById("aqui").innerHTML+=" + <input type='number' class='inputZ' required autocomplete='off' size='5' maxlength='10' step='0.1' id='y"+h+"' name='y"+h+"' />x<sub>"+h+"</sub>";
		}
		for (var i = 1; i <= restricoes; i++) {
			document.getElementById("aqui").innerHTML+="<p class='mt'><b>Restrição "+i+"</b></p>";
			document.getElementById("aqui").innerHTML+="<input type='number' class='input' required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+i+"1' name='x"+i+"1' />x<sub>1</sub>";
			for (var j = 2; j <= variaveis; j++) {
				document.getElementById("aqui").innerHTML+=" + <input type='number' class='input' required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+i+j+"' name='x"+i+j+"' />x<sub>"+j+"</sub>";
			}
			document.getElementById("aqui").innerHTML+="<span> <= </span>"
			+"<input type='number' class='input' required size='5' maxlength='10' id='b"+i+"' name='b"+i+"' style='text-align:left' />";
		}
		document.getElementById("aqui").innerHTML+="<p><b>Restrição "+(++restricoes)+"</b></p>"
		+"<p>x<sub>n</sub> >= 0</p>";
		document.getElementById("btn1").style.display = 'none';
		document.getElementById("in1").disabled = true;
		document.getElementById("in2").disabled = true;
		document.getElementById('y1').focus();
	}
} 

function printTabela(matriz) {
	var restricoes = parseInt(document.form1.regras.value);
	var variaveis = parseInt(document.form1.variaveis.value);
	var linhas = restricoes+1;
	var colunas = restricoes + variaveis+1;
	var tabela = document.createElement("table");
	tabela.className = "table table-striped";
	var thead = document.createElement("thead");
	var tbody=document.createElement("tbody");
  
	var tr = document.createElement("tr");
	for (var l = 0; l <= colunas; l++) {
		var variavel = matriz[0][l];
		var th = document.createElement("th");
		if(l == 0) {
			var texto = document.createTextNode(variavel);
			th.appendChild(texto)
		} else {
			var sub = document.createElement("sub");
			var textoSub = document.createTextNode(variavel.substr(1,1));
			var texto = document.createTextNode(variavel.substr(0,1));
			sub.appendChild(textoSub)
			th.appendChild(sub);
			th.insertBefore(texto, th.firstChild);
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	
	for(var n = 1; n <= linhas; n++) {
		var tr = document.createElement("tr");
		for(var o = 0; o <= colunas; o++) {
			var variavel = matriz[n][o];
			var td = document.createElement("td");
			if (o == 0 && n < linhas) {
				var sub = document.createElement("sub");
				var b = document.createElement("b");
				var textoSub = document.createTextNode(variavel.substr(1,1));
				var texto = document.createTextNode(variavel.substr(0,1));
				sub.appendChild(textoSub)
				b.appendChild(sub);
				b.insertBefore(texto, b.firstChild);
				td.appendChild(b);
			} else {
				if (variavel != '-Z') {
					var fracao = new Fraction(variavel);
					variavel = fracao.toFraction();
					var texto = document.createTextNode(variavel);
					td.appendChild(texto);
				} else {
					var b = document.createElement("b");
					var texto = document.createTextNode(variavel);
					b.appendChild(texto);
					td.appendChild(b);
				}
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	tabela.appendChild(thead);
	tabela.appendChild(tbody);
	tabela.border = 1;
	document.getElementById("tab").appendChild(tabela);
}

function resolver() {
	document.getElementById("form2").style.display = 'none';
	var restricoes = parseInt(document.form1.regras.value);
	var variaveis = parseInt(document.form1.variaveis.value);	
	var linhas = parseInt(document.form1.regras.value) + 1;
	var colunas = parseInt(document.form1.variaveis.value) + parseInt(document.form1.regras.value) + 1;
	
	if (validarCoeficientes(variaveis, restricoes) == 1) {
		return;
	}
	esconder(variaveis, restricoes);
	
	document.getElementById("btn2").style.display = 'none';
	document.getElementById("btn3").style.display = 'none';
	document.getElementById("tab").innerHTML+="<h2>Confira a Resolução:</h2>";
	document.getElementById("tab").innerHTML+="<hr/>";
	matriz = [[]];
	matriz[0][0] = 'VB';
	
	var indice = 1;
	for (var l = 1; l <= variaveis; l++) {
		matriz[0][indice] = "x"+indice;
		indice++;
	}
	for (var m = 1; m <= restricoes; m++) {
		matriz[0][indice] = "f"+m;
		indice++;
	}
	
	matriz[0][matriz[0].length] = 'b';

	// Adicionando linhas com as variavéis básicas. Ex: 'f1', 'f2'
	var x = document.querySelectorAll(".input");
	indice = 0;
	var coluna = 0;
	for (var i = 1; i < linhas; i++) {
		matriz.push(['f'+i]);
		for (var j = 1; j <= variaveis; j++) {
			matriz[i][j] = parseFloat(x[indice].value.replace(",","."));
			indice++;
		}
		coluna = variaveis + 1;
		for (var k = 1; k <= restricoes; k++) {
			if(i==k) {
				matriz[i][coluna] = 1;
			} else {
				matriz[i][coluna] = 0;
			}
			coluna++;
		}
		matriz[i][coluna] = x[indice].value;
		indice++;
	}
	

	// Adicionando a última linha '-Z'
	var z = document.querySelectorAll(".inputZ");
	coluna = 0;
	matriz.push(['-Z']);
	for (var l = 0; l < variaveis; l++) {
		matriz[linhas][l+1] = parseFloat(z[l].value.replace(",","."));
	}
	coluna = variaveis + 1;
	for (var m = 1; m <= restricoes; m++) {
		matriz[linhas][coluna] = 0;
		coluna++;
	}
	matriz[linhas][coluna] = 0;
	
	printTabela(matriz);
	
	var ite = 1;
	while (condicaoParada(matriz)) {
		document.getElementById("tab").innerHTML+="<p><b>Iteração "+ite+"</b></p>";
		calcMatriz(matriz);
		ite++;
	}
	
	var solucao = "Solução: ";
	
	for (var n = 1; n <= variaveis; n++) {
		var valor = 0;
		for (var o = 1; o <= restricoes; o++) {
			if (matriz[o][0] == 'x'+n) {
				valor = matriz[o][colunas];
				break;
			}
		}
		var fracao = new Fraction(valor);
		var numFormatado = fracao.toFraction();
		if (n == variaveis) {
			solucao += "x<sub>"+n+"</sub> = "+numFormatado;
		} else {
			solucao += "x<sub>"+n+"</sub> = "+numFormatado+", ";
		}
	}
	var fracao = new Fraction((matriz[linhas][colunas])*-1);
	var z = fracao.toFraction();
	solucao += " e Z = "+z;
	document.getElementById("tab").innerHTML+="<p class='solution'><b>"+solucao+"</b></p>";
	document.getElementById("btn4").type = 'button';
}
