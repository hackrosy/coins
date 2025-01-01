
document.addEventListener("DOMContentLoaded", () => {
    const rates = {
        usd: 25.00,
        eur: 27.50,
        egp: 1.00,
    };

    // تحديث جدول أسعار العملات
    const updateRates = () => {
        const rows = document.querySelectorAll("#currencies tbody tr");
        rows.forEach((row) => {
            const currency = row.cells[0].textContent.trim();
            if (rates[currency.toLowerCase()]) {
                row.cells[1].textContent = `${rates[currency.toLowerCase()]} جنيه`;
            }
        });
    };

    // وظيفة محول العملات
    const converterForm = document.querySelector("#converter form");
    converterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = parseFloat(document.querySelector("#amount").value);
        const fromCurrency = document.querySelector("#from-currency").value;
        const toCurrency = document.querySelector("#to-currency").value;
        
        if (isNaN(amount) || !rates[fromCurrency] || !rates[toCurrency]) {
            alert("يرجى إدخال بيانات صحيحة");
            return;
        }

        const convertedAmount = (amount * rates[fromCurrency]) / rates[toCurrency];
        alert(`المبلغ المحول: ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`);
    });

    // وظيفة تداول العملات
    const tradeForm = document.querySelector("#trade-form");
    tradeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const tradeType = document.querySelector("#trade-type").value;
        const tradeAmount = parseFloat(document.querySelector("#trade-amount").value);
        const paymentMethod = document.querySelector("#payment-method").value;

        if (isNaN(tradeAmount) || tradeAmount <= 0) {
            alert("يرجى إدخال مبلغ صالح");
            return;
        }

        const rate = rates["usd"]; // افتراض التعامل بالدولار
        const total = tradeType === "buy" ? tradeAmount * rate : tradeAmount / rate;
        const result = `تم ${tradeType === "buy" ? "شراء" : "بيع"} ${tradeAmount} دولار بـ ${total.toFixed(2)} جنيه عبر ${paymentMethod}.`;
        document.querySelector("#trade-result").textContent = result;
    });

    updateRates();
});
