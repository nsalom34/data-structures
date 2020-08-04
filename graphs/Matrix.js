class Row {
    constructor(lastIndex) {
        this.ROW = [];
        this.LENGTH = lastIndex + 1;
        this.LAST_INDEX = lastIndex;

        for (var i = 0; i <= lastIndex; i++) {
            this.ROW[i] = null;
        }
    }

    addValue(y, v) {
        if (y > this.LENGTH) {
            for (var index = this.LENGTH; index <= y; index++)
                this.ROW[index] = null;

            this.length = y + 1;
            this.lastIndex = y;
        }

        this.ROW[y] = v;
    }

    getValue(y) {
        if (y > this.LAST_INDEX) return 'Out of bound on the Y axis';
        return this.ROW[y];
    }
    expand(lastIndex) {
        for (var index = this.LENGTH; index <= lastIndex; index++)
            this.ROW[index] = null;

        this.LENGTH = lastIndex + 1;
        this.LAST_INDEX = lastIndex;
    }

    print() {
        var printableRow = '';
        this.ROW.forEach((row) => {
            printableRow += ` ${row || ' '} |`;
        });

        return printableRow;
    }
}

class matrix {
    constructor() {
        this.ROWS = [];
        this.ROWS.push(new Row(0));

        this.ROWS_LENGTH = 1;
        this.ROWS_LAST_INDEX = 0;

        this.COLUMNS_LENGTH = 1;
        this.COLUMNS_LAST_INDEX = 0;
    }

    addValue(x, y, v) {
        // Adjust length of each row first
        if (y > this.COLUMNS_LAST_INDEX) {
            this.ROWS.forEach((row) => row.expand(y));

            this.COLUMNS_LAST_INDEX = y;
            this.COLUMNS_LENGTH = y + 1;
        }

        if (x > this.ROWS_LAST_INDEX) {
            for (var index = this.ROWS_LENGTH; index <= x; index++) {
                this.ROWS[index] = new Row(this.COLUMNS_LAST_INDEX);
            }
            this.ROWS_LENGTH = x + 1;
            this.ROWS_LAST_INDEX = x;
        }

        this.ROWS[x].addValue(y, v);
    }

    getValue(x, y) {
        if (x > this.COLUMNS_LAST_INDEX) return 'Out of bounds on the X Axis';
        return this.ROWS[x].getValue(y);
    }

    print() {
        var printableString = '';
        this.ROWS.forEach((row) => {
            printableString += row.print();
            printableString += `\n`;
        });

        console.log(printableString);
    }
}

var a = new matrix();
a.addValue(0, 1, 'Row 0, Column 1');
a.addValue(3, 4, 'This is a test');
a.addValue(5, 7, 'blahhh');
a.addValue(9, 9, 'OK');
a.addValue(2, 4, 'Last test insert');

a.print();
