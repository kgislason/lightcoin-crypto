//let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username,
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const tr of this.transactions) {
      balance += tr.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance > this.amount);
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Withdrawal(50.25, myAccount);
console.log('T1: ', t1.commit());

const t2 = new Deposit(309.99, myAccount);
t2.commit()
console.log('T2: ', t2);

const t3 = new Deposit(120.00, myAccount);
t3.commit()
console.log('T3: ', t3);

console.log('Ending Balance:', myAccount.balance);
