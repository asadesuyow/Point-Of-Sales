function addEventListeners() {
  const quantities = document.querySelectorAll('input.quantity');
  quantities.forEach((input) => {
    input.addEventListener('change', calculateTotal);
  });

  const prices = document.querySelectorAll('input.price');
  prices.forEach((input) => {
    input.addEventListener('change', calculateTotal);
  });

  const discountInput = document.getElementById('discount');
  discountInput.addEventListener('change', calculateTotal);

  const paymentInput = document.getElementById('payment');
  paymentInput.addEventListener('change', calculateChange);
}

function cancelOrder() {
  const quantities = document.querySelectorAll('input.quantity');
  quantities.forEach((input) => {
    input.value = 0;
  });

  const discountInput = document.getElementById('discount');
  discountInput.value = 0;

  const paymentInput = document.getElementById('payment');
  paymentInput.value = 0;

  calculateTotal();
}

function calculateTotal() {
  const quantities = document.querySelectorAll('input.quantity');
  const prices = document.querySelectorAll('input.price');
  let total = 0;
  let totalQuantity = 0;

  for (let i = 0; i < quantities.length; i++) {
    const price = parseFloat(prices[i].value);
    const quantity = parseFloat(quantities[i].value); // Convert to floating-point number
    const subtotal = price * (isNaN(quantity) ? 0 : quantity); // Calculate subtotal and handle NaN case
    total += subtotal;
    totalQuantity += isNaN(quantity) ? 0 : quantity; 
    quantities[i].parentElement.nextElementSibling.textContent = isNaN(subtotal) ? 0 : subtotal; // Display 0 if subtotal is NaN
  }

  const totalElement = document.getElementById('total');
  totalElement.textContent = isNaN(total) ? 0 : total; 

  const discountThreshold = 50000;
  let discount = 0;
  if (total > discountThreshold) {
    discount = total * 0.05;
  }

  const discountInput = document.getElementById('discount');
  discountInput.value = discount;

  const totalPayment = total - discount;

  const totalQuantityElement = document.getElementById('totalQuantity');
  totalQuantityElement.textContent = totalQuantity;

  const totalPaymentElement = document.getElementById('totalPayment');
  totalPaymentElement.textContent = totalPayment;

  calculateChange(); // Calculate the change after updating total payment
}

function calculateChange() {
  const totalPayment = parseFloat(document.getElementById('totalPayment').textContent); 
  const payment = parseFloat(document.getElementById('payment').value); 

  const change = payment - totalPayment;
  const changeElement = document.getElementById('change');
  changeElement.textContent = `Kembalian: ${change}`;
}

function printReceipt() {
  const quantities = document.querySelectorAll('input.quantity');
  const menuItems = document.querySelectorAll('td:nth-child(2)');
  const prices = document.querySelectorAll('input.price');
  const totalHargaPesanan = parseFloat(document.getElementById('total').textContent); 
  const diskon = parseFloat(document.getElementById('discount').value); // Convert to floating-point number
  const totalPembayaran = parseFloat(document.getElementById('totalPayment').textContent); // Convert to floating-point number
  const customerName = document.getElementById('customerName').value;
  const date = document.getElementById('date').value;
  const payment = parseFloat(document.getElementById('payment').value); // Convert to floating-point number
  const change = parseFloat(document.getElementById('change').textContent.split(':')[1]); // Convert to floating-point number

  let receiptText = `======= Struk Pembelian =======\n`;
  receiptText += `Nama Pelanggan: ${customerName}\n`;
  receiptText += `Tanggal: ${date}\n`;
  for (let i = 0; i < quantities.length; i++) {
    const quantity = parseFloat(quantities[i].value); // Convert to floating-point number
    if (quantity > 0) {
      const menuItem = menuItems[i].textContent;
      const price = parseFloat(prices[i].value);  
      const subtotal = price * quantity;
      receiptText += `${menuItem} x ${quantity} = ${subtotal}\n`;
    }
  }
  receiptText += `=============================\n`;
  receiptText += `Total Harga Pesanan: ${totalHargaPesanan}\n`;
  receiptText += `Diskon: ${diskon}\n`;
  receiptText += `Total Pembayaran: ${totalPembayaran}\n`;
  receiptText += `Bayar: ${payment}\n`;
  receiptText += `Kembalian: ${change}\n`;
  receiptText += `=============================\n`;

  console.log(receiptText);
  alert("Berikut adalah struk pembelian:\n\n" + receiptText);
}


addEventListeners();
