const bill = document.getElementById('bill')
const people = document.getElementById('numberOfPeople')
const tips = document.querySelectorAll('.select-grid-box')
const tipAmount = document.querySelector('.tip-amount')
const totalAmount = document.querySelector('.total-amount')
const tipCustom = document.querySelector('.custom')
const resetButton = document.querySelector('.reset')
const errorPeople = document.querySelector('.error-people')

bill.addEventListener('input', billInputFun)
people.addEventListener('input', peopleInputFun)

// Check which tip is active
tips.forEach(function (tip) {
  tip.addEventListener('click', handleClick)
})

// Custom tip
tipCustom.addEventListener('input', tipInputFun)

// Reset button
resetButton.addEventListener('click', resetFun)

bill.value = '0'
people.value = '1'
tipAmount.innerHTML = '$' + (0.0).toFixed(2)
totalAmount.innerHTML = '$' + (0.0).toFixed(2)

let billValue = 0
let peopleValue = 1
let tipValue = 0.15

// Bill input function
function billInputFun () {
  billValue = parseFloat(bill.value)
  calculateTip()
}

// People input function
function peopleInputFun () {
  peopleValue = parseFloat(people.value)

  if (peopleValue < 1) {
    errorPeople.style.display = 'block'
    people.style.border = '2px solid red'
  } else {
    errorPeople.style.display = 'none'
    people.style.border = 'none'
    calculateTip()
  }
}

// Custom input function
function tipInputFun () {
  tipValue = parseFloat(tipCustom.value / 100)

  tips.forEach(function (tip) {
    tip.classList.remove('active')
  })
  calculateTip()
}

// Tips click handler
function handleClick (e) {
  tips.forEach(function (tip) {
    tip.classList.remove('active')
    if (e.target.innerHTML === tip.innerHTML) {
      tip.classList.add('active')
      tipValue = parseFloat(tip.innerHTML) / 100
    }
  })
  calculateTip()
}

// Calculate tip
function calculateTip () {
  if (peopleValue >= 1) {
    const tipAmt = (billValue * tipValue) / peopleValue
    const totalAmt = (billValue + tipAmt) / peopleValue
    tipAmount.innerHTML = '$' + tipAmt.toFixed(2)
    totalAmount.innerHTML = '$' + totalAmt.toFixed(2)
  }
}

// Reset button function
function resetFun () {
  bill.value = '0'
  billInputFun()
  people.value = '1'
  peopleInputFun()
  tipCustom.value = ''
}
