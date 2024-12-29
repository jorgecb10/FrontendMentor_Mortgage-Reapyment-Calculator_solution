document.addEventListener("DOMContentLoaded", () => {
    console.log('documento listo');

    const inputAmount = document.getElementById('amount')
    const inputYears = document.getElementById('years')
    const inputRate = document.getElementById('rate')
    const radios = document.querySelectorAll('input[type="radio"]')
    const formulario = document.getElementById('formulario')
    const btnReset = document.getElementById('btnReset')
    const divRadios = document.getElementById('div-radios')
    const resultados = document.getElementById('resultados')
    
    const mortgage = {
        amount: 0,
        years: 0,
        rate: 0,
        type: '',
    }

    inputAmount.addEventListener('input', validar)
    inputYears.addEventListener('input', validar)
    inputRate.addEventListener('input', validar)

    btnReset.addEventListener('click', e => {
        e.preventDefault()
        resetFormulario()
    })

    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            actualizarRadio(this)
        })
    })

    formulario.addEventListener('submit', e => {
        e.preventDefault()

        limpiarAlertas()

        const esFormularioValido = validarFormulario()

        if(esFormularioValido) {
            resultados.innerHTML = `
                <div class="results">
                    <h1 class="text-white text-lg text-left">Your results</h1>
                    <p class="text-slate-400 mt-2">
                        Your results are shown below based on the information you provided. 
                        To adjust the results, edit the form and click “calculate repayments” again.
                    </p>

                    <div class="mt-7 border-t-[3px] border-lime rounded-md">
                        <div class="p-5 bg-slate-900-hsl rounded-md">
                            <div>
                                <h3 class="text-sm text-slate-400">Your monthly repayments</h3>
                                <p class="text-lime text-5xl font-extrabold mt-2">
                                    ${calcularHipoteca(mortgage)[0]}
                                </p>
                            </div>

                            <p class="h-[1px] bg-slate-100 bg-opacity-25 my-5"> </p>

                            <div>
                                <h3 class="text-sm text-slate-400">Total you'll repay over the term</h3>
                                <p class="text-white text-xl font-extrabold mt-2">
                                    ${calcularHipoteca(mortgage)[1]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        } else {
            console.log('no es válido');
        }
    })

    function validarFormulario() {
        let isValid = true

        const inputsText = [inputAmount, inputYears, inputRate]

        inputsText.forEach(input => {
            if (!validar({ target: input })) {
                isValid = false;
            }
        })

        if(!validarRadios()) {
            mostrarAlerta(divRadios, 'The field is required')
            isValid = false
        }

        return isValid
    }

    function validar(e) {
        const value = e.target.value
        let cleanedValue
        let elementoPadre = e.target.parentElement
        let childElement = e.target.parentElement.querySelector('span')

        if(e.target.value.trim() === '') {
            mostrarAlerta(elementoPadre.parentElement, 'This field is required')
            e.target.parentElement.classList.remove('border-slate-400', 'focus-within:border-lime')
            e.target.parentElement.classList.add('border-red-hsl')
            childElement.classList.remove('currency-symbol')
            childElement.classList.add('currency-symbol-error')
            mortgage[e.target.name] = 0
            return false
        }

        if(e.target.id === 'amount' || e.target.id === 'rate') {
            cleanedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        } else if(e.target.id === 'years') {
            cleanedValue = value.replace(/[^0-9]/g, '')
        }

        this.value = cleanedValue

        if(cleanedValue.trim() !== '') {
            mortgage[e.target.name] = Number(cleanedValue)
        } else {
            mortgage[e.target.name] = 0
        }

        limpiarAlerta(elementoPadre.parentElement)
        e.target.parentElement.classList.remove('border-red-hsl')
        e.target.parentElement.classList.add('border-slate-400', 'focus-within:border-lime')
        childElement.classList.remove('currency-symbol-error')
        childElement.classList.add('currency-symbol')
        return true
    }

    function validarRadios() {
        return [...radios].some(radio => radio.checked)
    }

    function actualizarRadio(radio) {
        const contenedor = radio.closest('.btn-radio')

        // Remover clases activas de todos los contenedores
        document.querySelectorAll('.btn-radio').forEach(div => {
            div.classList.remove('border-lime', 'bg-lime')
            div.classList.add('border-slate-400')
        })

        // Agregar clases activas al contenedor seleccionado
        if (radio.checked) {
            contenedor.classList.remove('border-slate-400');
            contenedor.classList.add('border-lime', 'bg-lime', 'bg-opacity-25');
            mortgage.type = radio.value;

            limpiarAlerta(divRadios)
        }
    }

    function mostrarAlerta(referencia, mensaje) {
        limpiarAlerta(referencia)

        const alerta = document.createElement('P')
        alerta.classList.add('alerta', 'text-red-hsl', 'text-xs', 'mt-1')
        alerta.textContent = mensaje
        referencia.appendChild(alerta)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta')

        if(alerta) {
            referencia.removeChild(alerta)
        }
    }

    function limpiarAlertas() {
        document.querySelectorAll('.alerta').forEach(alerta => 
            alerta.remove())
    }

    function resetFormulario() {
        const inputsText = [inputAmount, inputYears, inputRate]

        mortgage.amount = 0
        mortgage.years = 0
        mortgage.rate = 0
        mortgage.type = ''

        document.querySelectorAll('.btn-radio').forEach(div => {
            div.classList.remove('border-lime', 'bg-lime', 'bg-opacity-25')
            div.classList.add('border-slate-400')
        })

        formulario.reset()
        inputsText.forEach(input => {
            let childElement = input.parentElement.querySelector('span')
            limpiarAlerta(input.parentElement.parentElement)
            input.parentElement.classList.remove('border-red-hsl')
            input.parentElement.classList.add('border-slate-400', 'focus-within:border-lime')
            childElement.classList.remove('currency-symbol-error')
            childElement.classList.add('currency-symbol')
        });
        limpiarAlerta(divRadios)

        resultados.innerHTML = `
            <div class="results flex flex-col items-center justify-center">
                <img src="src/assets/images/illustration-empty.svg" alt="image-empty">

                <div class="mt-1">
                    <h2 class="text-lg text-center text-white">Results shown here</h2>
                    <p class="text-slate-400 text-center mt-2">
                    Complete the form and click “calculate repayments” to see what your monthly repayments would be.
                    </p>
                </div>
            </div>
        `
    }

    function calcularHipoteca({ amount, years, rate }) {
        const meses = years * 12
        const tasaMensual = rate / 100 / 12

        const pagoMensual = (amount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

        const pagoMensualRedondeado = pagoMensual.toFixed(2);

        const totalAPagar = pagoMensual * meses;

        const totalAPagarRedondeado = totalAPagar.toFixed(2);

        const pagoMensualFormateado = Number(pagoMensualRedondeado).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });
        const totalAPagarFormateado = Number(totalAPagarRedondeado).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });

        const pagos = [ pagoMensualFormateado, totalAPagarFormateado ]

        return pagos
    }
})