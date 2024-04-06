// dark mode //
let trilho = document.querySelector('.trilho');
let body = document.querySelector('body');
let titulo = document.querySelector('.titulo');

trilho.addEventListener('click', ()=>{
    trilho.classList.toggle('dark')
    titulo.classList.toggle('dark')
    body.classList.toggle('dark')
});

//gerador de senha//

function tiposDeCaracteres() {
    const uppercase = document.querySelector('#inclu_maiuscula:checked');
    const lowercase = document.querySelector('#inclu_miniscula:checked');
    const number = document.querySelector('#inclu_numero:checked');
    const specialCaracter = document.querySelector('#inclu_caract:checked');

    const charTypes = [];

    if(uppercase){
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZÇ');
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyzç');
    }

    if (number) {
        charTypes.push('1234567890');
    }

    if (specialCaracter) {
        charTypes.push('!\'"@#$%&*()_-+=[]{}.,;/');
    }

    return charTypes;
}

function mensagem(text, background) {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background,
            boxShadow: 'none',
        }
    }).showToast();
}

function tamanhoDaSenha() {
    const size = document.querySelector('#size').value;

    if(isNaN(size) || size < 4 || size > 128 ){
        mensagem('Tamanho inválido, digite um número entre 4 e 128.', '#dc2626');
    }

    return size;
}


function geraCaractereAleatorio(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function gerarSenha(size, charTypes) {
    let senhaGerada = '';

    while (senhaGerada.length < size) {
        senhaGerada += geraCaractereAleatorio(charTypes);
    }

    return senhaGerada;
}

const botaoGerar = document.querySelector('.botao_gerar');

botaoGerar.addEventListener('click', ()=>{
    const size = tamanhoDaSenha();
    const charTypes = tiposDeCaracteres();

    if (!size) {
        return
    }

    if (!charTypes.length) {
        mensagem('Selecione pelo menos um tipo de caractere!', '#dc2626');
        return
    }

    const senhaGerada = gerarSenha(size, charTypes);

    document.querySelector('.senha').textContent = senhaGerada;
})

const botaoCopiar = document.querySelector('#copy');

botaoCopiar.addEventListener('click', ()=>{
    navigator.clipboard.writeText(document.querySelector('.senha').textContent);
    mensagem('Senha copiada com sucesso!', '#84cc16');

})