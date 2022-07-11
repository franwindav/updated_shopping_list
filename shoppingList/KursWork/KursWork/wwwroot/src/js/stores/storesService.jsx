import "jquery";
export function synchronize() { $(".synchronization").removeClass("false"); }

export function outSynchronize() { $(".synchronization").addClass("false"); }

// ����� ������� �������� ������ ����������� ��� ����� � ��������

class Data {
    constructor() {
        this.clear();
    }
    clear() {
        this.res = [];
        this.cnt = 0;
        this.cntLists = [];
    }
    // �������� ������ ������
    addList(id, title, key, products = []) {
        // �� ���� ������ �������� list
        this.res[this.cnt] = { id, title, key, products: [] }
        // ������� ��� ���� � ��� ���-�� ��-�� 0
        this.cntLists[this.cnt] = 0;
        // ��������� ���������� ��������� (����� ���� ����������)
        products.forEach(e => {
            this.addProduct(id, e.id, e.title, e.rating, e.numberRatings, e.price, e.percentDiscount, e.priceDiscount,
                e.about, e.isUrgency, e.isDiscount, e.isNew, e.isRead);
        });
        // ���-�� ������ �����������
        this.cnt++;
    }
    // �������� ������� ������
    addProduct(index, id, title, rating, numberRatings, price, percentDiscount, priceDiscount, about, isUrgency, isDiscount, isNew, isRead = false) {
        this.res.forEach((v, i) => {
            if (v.id === index) {
                this.res[i].products[this.cntLists[i]] = { id, title, rating, numberRatings, price, percentDiscount, priceDiscount, about, specialOffers: { isUrgency, isDiscount, isNew, isRead } };
                this.cntLists[i]++;
            }
        });

    }
    // �������� ������� ��� ���������
    readProduct(index, id) {
        this.res.forEach((v, i) => {
            if (v.id === index)
                this.res[i].products.forEach((e, j) => {
                    if (e.id === id)
                        this.res[i].products[j].specialOffers.isRead = !this.res[i].products[j].specialOffers.isRead;
                });
        });
    }
    // ������� ��� ������ �� ������� � �� �������
    deleteList(id) {
        this.res = this.res.filter((e, i) => {
            if (e.id === id)
                this.cntLists.filter((ee, ii) => { return ii !== i })
            return e.id !== id;
        });
        this.cnt--;
    }
    // ������� ��������� ������� ������
    deleteProduct(index, id) {
        this.res.forEach((v, i) => {
            if (v.id === index) {
                this.res[i].products = this.res[i].products.filter(e => { return e.id !== id; });
                this.cntLists[i]--;
            }
        });

    }
}

const data = new Data();
export function getData() { return data };
