const totalName = document.getElementById("total-name");
const totalAmount = document.getElementById("total-amount");

//INCOMES
const nameIncome = document.getElementById("search-input-income");
const nameIncomeAmount = document.getElementById("amount-income");
const incomeEntryContainer = document.getElementById("income-container");
const incomeListContainer = document.getElementById("income-list");
const totalIncomeSum = document.getElementById("total-income-sum");
const incomeAlert = document.getElementById("income-alert");

//OUCOMES
const nameOutcome = document.getElementById("search-input-outcome");
const nameOutcomeAmount = document.getElementById("amount-outcome");
const outcomeEntryContainer = document.getElementById("outcome-container");
const outcomeListContainer = document.getElementById("outcome-list");
const totalOutcomeSum = document.getElementById("total-outcome-sum");
const outcomeAlert = document.getElementById("outcome-alert");

const modal = document.getElementById("edit-form");
const modalInputName = document.getElementById("edit-form-name");
const modalInputAmount = document.getElementById("edit-form-amount");

const addBtnSave = document.getElementById("add-btn-save");
const addBtnSaveOutcome = document.querySelector("add-btn-outcome-save");
const addBtnCancel = document.getElementById("add-btn-cancel");

const updateTotalBalance = () => {
    const income = getTotalIncomes();
    const outcome = getTotalOutcomes();
    const total = income - outcome;

    if (total === 0) {
        totalName.textContent = `Bilans wynosi`;
        totalAmount.textContent = total;
    } else if (total >= 0) {
        totalName.textContent = `Możesz jeszcze wydać`;
        totalAmount.textContent = total;
    } else if (total <= 0) {
        totalName.textContent = `Bilans jest ujemny`;
        totalAmount.textContent = Math.abs(total);
    }
};

const incomes = [];

const getTotalIncomes = () => incomes.reduce((a, b) => a + Number(b.amount), 0);

const updateTotalIncomes = () => {
    const sumIncome = getTotalIncomes();
    totalIncomeSum.textContent = `Suma przychodów: ${sumIncome} zł`;
};

function renderIncomesList() {
    incomeListContainer.innerHTML = "";
    incomes.forEach((income, index) => {
        const newElement = document.createElement("div");
        const newElementContainer = document.createElement("span");
        const newElementInputName = document.createElement("span");
        const newElementInputAmount = document.createElement("span");
        const symbol = document.createElement("p");
        const newElementButtons = document.createElement("span");

        newElement.classList.add("new-element");
        newElementInputName.classList.add("new-element-input");
        newElementInputAmount.classList.add("new-element-amount");
        newElementContainer.classList.add("new-element-container");
        symbol.classList.add("symbol");

        newElementInputAmount.textContent = parseFloat(income.amount).toFixed(
            2
        );
        symbol.textContent = "PLN";
        newElementInputName.textContent = income.title;

        const addBtnEdit = document.createElement("button");
        addBtnEdit.textContent = "Edytuj";
        addBtnEdit.classList.add("add-btn-default");

        const addBtnDelete = document.createElement("button");
        addBtnDelete.textContent = "Usuń";
        addBtnDelete.classList.add("add-btn-default");

        //DELETE INCOME
        addBtnDelete.addEventListener("click", () => {
            const incomeToRemoveIndex = incomes.findIndex(
                (item) => item.id === income.id
            );
            incomes.splice(incomeToRemoveIndex, 1);
            renderIncomesList();
        });

        //MODAL - EDIT INCOME
        const handleIncomeEdit = () => {
            const elementToEdit = incomes.find((item) => item.id === income.id);
            modal.style.display = "flex";
            modalInputName.value = income.title;
            modalInputAmount.value = income.amount;
            const handleSubmit = (event) => {
                event.preventDefault();

                elementToEdit.title = modalInputName.value;
                elementToEdit.amount = modalInputAmount.value;

                modal.style.display = "none";
                modal.removeEventListener("submit", handleSubmit);
                renderIncomesList();
            };

            modal.addEventListener("submit", handleSubmit);
        };

        addBtnEdit.addEventListener("click", handleIncomeEdit);

        addBtnCancel.addEventListener("click", () => {
            modal.style.display = "none";
        });

        const clearInputs = () => {
            nameIncome.value = "";
            nameIncomeAmount.value = "";
        };
        clearInputs();

        incomeListContainer.appendChild(newElement);
        newElement.appendChild(newElementContainer);
        newElementContainer.appendChild(newElementInputAmount);
        newElementContainer.appendChild(symbol);
        newElementContainer.appendChild(newElementInputName);
        newElement.appendChild(newElementButtons);
        newElementButtons.appendChild(addBtnEdit);
        newElementButtons.appendChild(addBtnDelete);
    });
    updateTotalIncomes();
    updateTotalBalance();
}

incomeEntryContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
        nameIncome.value.trim() === "" ||
        nameIncomeAmount.value.trim() === ""
    ) {
        incomeAlert.innerHTML = "<span>Wprowadź nazwę i kwotę</span>";
    } else if (nameIncomeAmount.value <= 0) {
        incomeAlert.innerHTML = "<span>Kwota powinna być większa od 0</span>";
    } else {
        incomeAlert.innerHTML = "";
        incomes.push({
            title: event.target.incomeTitle.value,
            amount: event.target.incomeAmount.value,
            id: Math.random(),
        });
        renderIncomesList();
    }
});

// OUTCOMES --------------------------------------------------------------

const outcomes = [];

const getTotalOutcomes = () =>
    outcomes.reduce((a, b) => a + Number(b.amount), 0);

const updateTotalOutcomes = () => {
    const sumOutcome = getTotalOutcomes();
    totalOutcomeSum.textContent = `Suma wydatków: ${sumOutcome} zł`;
};

function renderOutcomeList() {
    outcomeListContainer.innerHTML = "";
    outcomes.forEach((outcome, index) => {
        const newElement = document.createElement("div");
        const newElementContainer = document.createElement("span");
        const newElementInputName = document.createElement("span");
        const newElementInputAmount = document.createElement("span");
        const symbol = document.createElement("p");
        const newElementButtons = document.createElement("span");

        newElement.classList.add("new-element");
        newElementInputName.classList.add("new-element-input");
        newElementInputAmount.classList.add("new-element-amount");
        newElementContainer.classList.add("new-element-container");
        symbol.classList.add("symbol");

        newElementInputAmount.textContent = parseFloat(outcome.amount).toFixed(
            2
        );
        symbol.textContent = "PLN";
        newElementInputName.textContent = outcome.title;

        const addBtnEdit = document.createElement("button");
        addBtnEdit.textContent = "Edytuj";
        addBtnEdit.classList.add("add-btn-default");

        const addBtnDelete = document.createElement("button");
        addBtnDelete.textContent = "Usuń";
        addBtnDelete.classList.add("add-btn-default");

        //DELETE OUTCOME
        addBtnDelete.addEventListener("click", () => {
            const outcomeToRemoveIndex = outcomes.findIndex(
                (item) => item.id === outcome.id
            );
            outcomes.splice(outcomeToRemoveIndex, 1);
            renderOutcomeList();
        });

        //MODAL - EDIT OUTCOME
        const handleIncomeEdit = () => {
            const elementToEdit = outcomes.find(
                (item) => item.id === outcome.id
            );
            modal.style.display = "flex";
            modalInputName.value = outcome.title;
            modalInputAmount.value = outcome.amount;
            const handleSubmit = (event) => {
                event.preventDefault();

                elementToEdit.title = modalInputName.value;
                elementToEdit.amount = modalInputAmount.value;

                modal.style.display = "none";
                modal.removeEventListener("submit", handleSubmit);
                renderOutcomeList();
            };

            modal.addEventListener("submit", handleSubmit);
        };

        addBtnEdit.addEventListener("click", handleIncomeEdit);

        addBtnCancel.addEventListener("click", () => {
            modal.style.display = "none";
        });

        const clearInputs = () => {
            nameOutcome.value = "";
            nameOutcomeAmount.value = "";
        };
        clearInputs();

        outcomeListContainer.appendChild(newElement);
        newElement.appendChild(newElementContainer);
        newElementContainer.appendChild(newElementInputAmount);
        newElementContainer.appendChild(symbol);
        newElementContainer.appendChild(newElementInputName);
        newElement.appendChild(newElementButtons);
        newElementButtons.appendChild(addBtnEdit);
        newElementButtons.appendChild(addBtnDelete);
    });
    updateTotalOutcomes();
    updateTotalBalance();
}

outcomeEntryContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
        nameOutcome.value.trim() === "" ||
        nameOutcomeAmount.value.trim() === ""
    ) {
        outcomeAlert.innerHTML = "<span>Wprowadź nazwę i kwotę</span>";
    } else if (nameOutcomeAmount.value <= 0) {
        outcomeAlert.innerHTML = "<span>Kwota powinna być większa od 0</span>";
    } else {
        outcomeAlert.innerHTML = "";
        outcomes.push({
            title: event.target.outcomeTitle.value,
            amount: event.target.outcomeAmount.value,
            id: Math.random(),
        });
        renderOutcomeList();
    }
});
