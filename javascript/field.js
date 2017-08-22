var ItemField = {
    currentNumber : 1,
    itemTemplate1 : '<h3>目的地__count__<h3/>'
        + '<p><input type="text" name="text__count__" size="30" /></p>',
    itemTemplate2 : '<h3>滞在時間__count__<h3/>'
        + '<p><input type="text" name="text__count__" size="30" /></p>',
    add : function () {
        this.currentNumber++;

        var field1 = document.getElementById('item' + this.currentNumber);
        var field2 = document.getElementById('item' + this.currentNumber);

        var newItem1 = this.itemTemplate1.replace(/__count__/mg, this.currentNumber);
        var newItem2 = this.itemTemplate2.replace(/__count__/mg, this.currentNumber);

        field1.innerHTML = newItem1;
        field2.innerHTML = newItem2;

        var nextNumber = this.currentNumber + 1;
        var new_area = document.createElement("div");
        new_area.setAttribute("id", "item" + nextNumber);

        field1.appendChild(new_area);
        field2.appendChild(new_area);
    },
    remove : function () {
        if ( this.currentNumber == 1 ) { return; }

        var field = document.getElementById('item' + this.currentNumber);
        field.removeChild(field.lastChild);
        field.innerHTML = '';

        this.currentNumber--;
    }
}
