(() => {
    let StydentsStore = [
        {
            fullname: 'Усачёв Петр Афанасьевич',
            faculty: 'Российский государственный университет нефти и газа имени И.М. Губкина',
            date: new Date(1977, 09, 19),
            year: '2012',
        },
        {
            fullname: 'Якушов Максим Степанович',
            faculty: 'Казанский федеральный университет',
            date: new Date(2007, 07, 20),
            year: '2003',
        },
        {
            fullname: 'Мацовкин Максим Прохорович',
            faculty: 'Московский государственный университет технологий и управления имени К.Г. Разумовского',
            date: new Date(1965, 07, 19),
            year: '2007',
        },
        {
            fullname: 'Ясенкова Алла Марковна',
            faculty: 'Казанский национальный исследовательский технический университет имени А.Н. Туполева',
            date: new Date(1993, 06, 16),
            year: '2003',
        },
        {
            fullname: 'Якимович Марина Саввановна',
            faculty: 'Дальневосточный федеральный университет',
            date: new Date(1977, 03, 16),
            year: '2001',
        },
        {
            fullname: 'Ивашина Антонина Николаевна',
            faculty: 'Южный федеральный университет',
            date: new Date(2000, 03, 05),
            year: '2017',
        },
        {
            fullname: 'Баязов Герасим Всеволодович',
            faculty: 'Омский государственный технический университет',
            date: new Date(2004, 05, 26),
            year: '2019',
        },
        {
            fullname: 'Леонтьева Юлиана Никандровна',
            faculty: 'Сибирский федеральный университет',
            date: new Date(1998, 05, 23),
            year: '2012',
        },
        {
            fullname: 'Афанасьев Ростислав Афанасьевич',
            faculty: 'Тульский государственный университет',
            date: new Date(1994, 07, 19),
            year: '2009',
        },
        {
            fullname: 'Талалин Василий Аркадинович',
            faculty: 'Санкт-Петербургский государственный университет',
            date: new Date(1967, 01, 08),
            year: '2000',
        },
        {
            fullname: 'Райков Аркадий Прохорович',
            faculty: 'Финансовый университет при Правительстве РФ',
            date: new Date(1990, 10, 28),
            year: '2015',
        },
    ];

    const TechnicalFunctions = {
        openStudentsForm() {
            let count = 0;
    
            return () => {
                count++;
                if (count % 2 === 1) document.getElementById('addStudentForm').style.display = 'flex'
                else document.getElementById('addStudentForm').style.display = 'none';
            };
        },

        AnimationOpenSearchForm(selector) {
            return () => {
                document.getElementById(`${selector}-search-open`).style.display = 'none';
                document.getElementById(`${selector}-search-form`).style.display = 'flex';
            };
        },

        AnimationCloseSearchForm(selector) {
            return () => {
                document.getElementById(`${selector}-search-form`).style.display = 'none';
                document.getElementById(`${selector}-search-open`).style.display = 'flex';
            };
        },

        AnimationMarkerText(selector) {
            return () => {
                let findString = document.getElementById(`${selector}-search-info`).value;
                let columnNumber = 0;

                if (selector === 'fullname') columnNumber = 0;
                else if (selector === 'faculty') columnNumber = 1;
                else if (selector === 'date') columnNumber = 2;
                else if (selector === 'year') columnNumber = 3;

                for (let element of document.querySelectorAll('.table-students > .students-block')) {
                    let childElement = element.childNodes[columnNumber].textContent;
                        childElement = childElement.split('<span>').join('');
                        childElement = childElement.split('</span>').join('');
                        element.childNodes[columnNumber].innerHTML = childElement;
                };

                for (let element of document.querySelectorAll('.table-students > .students-block')) {
                    let childElement = element.childNodes[columnNumber].textContent;
                    if (childElement.includes(findString)) {
                        childElement = childElement.split(findString).join(`<span>${findString}</span>`)
                        element.childNodes[columnNumber].innerHTML = childElement.split(' ').join('&nbsp');
                    };
                };
            };
        },

        createDOMElement(fullname, faculty, date, year) {
            const tableElement = [];
            tableElement.push(document.createElement('li'));
            tableElement.push(document.createElement('li'));
            tableElement.push(document.createElement('li'));
            tableElement.push(document.createElement('li'));

            date = new Date(date);

            tableElement[0].innerHTML = fullname;
            tableElement[1].innerHTML = faculty;
            tableElement[2].innerHTML = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (${new Date().getFullYear() - date.getFullYear()} лет)`;

            if (Number(year) + 4 > (new Date()).getFullYear()) tableElement[3].innerHTML = `${year}-${Number(year) + 4} (${(new Date()).getFullYear() - year} курс)`;
            else tableElement[3].innerHTML = tableElement[3].innerHTML = `${year}-${Number(year) + 4} (закончил)`;


            const container = document.querySelector('.table-students');
            const newTable = document.createElement('ul');
            newTable.classList.add('students-block');
            
            newTable.append(tableElement[0]);
            newTable.append(tableElement[1]);
            newTable.append(tableElement[2]);
            newTable.append(tableElement[3]);
            container.append(newTable);
        },

        addNewStudent(filterObject) {
            return () => {
                let newElementValue = {};         
                newElementValue.fullname = document.getElementById('fullname').value.trim().split(' ').filter(element => element.length != 0);
                newElementValue.faculty = document.getElementById('faculty').value.trim().split(' ').filter(element => element.length != 0);
                newElementValue.date = document.getElementById('date').valueAsDate;
                newElementValue.year = document.getElementById('year').value.trim();
    
                function errorMessage(id = 'clear', message) {
                    for (let element of document.querySelectorAll('.form-student__input')) element.classList.remove('error-style');

                    if (id === 'clear') {
                        document.getElementById('error').style.display = 'none';
                        document.getElementById('error').innerHTML = '';
                        return
                    };
    
                    document.getElementById(id).classList.add('error-style');
                    document.getElementById('error').style.display = 'flex';
                    document.getElementById('error').innerHTML = message;
                };
    
                if (newElementValue.fullname.length !== 3) {
                    errorMessage('fullname', "Ошибка : Вы ввели неправильную форму имени (пример: <b>Фамилия Имя Отчество</b>)");
                    return;
                };
    
                if (newElementValue.faculty.length === 0) {
                    errorMessage('faculty', "Ошибка : Вы не заполнили форму (пример: <b>Московский политехнический университет</b>)");
                    return;
                };
    
                if (newElementValue.date === null) {
                    errorMessage('date', "Ошибка : Вы не заполнили форму (пример: <b>14.08.1983</b>)");
                    return;
                }
                else if (newElementValue.date.getFullYear() < 1900 || newElementValue.date.getFullYear() > (new Date()).getFullYear()) {
                    errorMessage('date', `Ошибка : Дата не соответствует правилам (<b>Дата должна быть больше 1899г, и меньше ${(new Date()).getFullYear()}</b>)`);
                    return;
                };
    
                if (Number(newElementValue.year) < 2000 || Number(newElementValue.year) > (new Date().getFullYear())) {
                    errorMessage('year', `Ошибка : Вы ввели неправильную форму даты обучения (<b>даты обучения должна быть больше 1999г, и меньше ${(new Date()).getFullYear()}</b>)`);
                    return;
                };
    
                errorMessage();
    
                for (let id of ['fullname', 'faculty', 'date', 'year']) {
                    document.getElementById(id).value = '';
                };
    
                StydentsStore.push({
                    fullname: newElementValue.fullname.join(' '),
                    faculty: newElementValue.faculty.join(' '),
                    date: newElementValue.date,
                    year: newElementValue.year
                });
    
                (TechnicalFunctions.pullFilterSetting('', '', filterObject))();
            };
        },

        addOldStudents() {
            for (element of StydentsStore) {
                this.createDOMElement(element.fullname, element.faculty, element.date, element.year);
            };
        },

        sortStudents(selector, filterValue, storageObjectArray) {
            let objectArrayCopy = storageObjectArray.slice();

            switch(selector) {
                case 'fullname':
                case 'faculty':
                    for (let i = 0; i < objectArrayCopy.length; ++i) {
                        for (let j = 0; j < objectArrayCopy.length - 1; ++j) {
                            if (objectArrayCopy[j][selector][0][0] > objectArrayCopy[j + 1][selector][0][0]) {
                                objectArrayCopy.splice(j, 0, objectArrayCopy[j + 1]);
                                objectArrayCopy.splice(j + 2, 1);
                                continue;
                            };
                        };
                    };
                break;
                case 'date':
                    for (let i = 0; i < objectArrayCopy.length; ++i) {
                        for (let j = 0; j < objectArrayCopy.length - 1; ++j) {

                            let dateOld = new Date(objectArrayCopy[j]['date']);
                            let dateNew = new Date(objectArrayCopy[j + 1]['date']);

                            if (dateOld.getTime() < dateNew.getTime()) {
                                objectArrayCopy.splice(j, 0, objectArrayCopy[j + 1]);
                                objectArrayCopy.splice(j + 2, 1);
                                continue;
                            };
                        };
                    };
                break;
                case 'year':
                    for (let i = 0; i < objectArrayCopy.length; ++i) {
                        for (let j = 0; j < objectArrayCopy.length - 1; ++j) {
                            if (Number(objectArrayCopy[j]['year']) > Number(objectArrayCopy[j + 1]['year'])) {
                                objectArrayCopy.splice(j, 0, objectArrayCopy[j + 1]);
                                objectArrayCopy.splice(j + 2, 1);
                                continue;
                            };
                        };
                    };
                break;
            };

            if (filterValue === 'filterMaxToMin') objectArrayCopy = objectArrayCopy.reverse();
            return objectArrayCopy;
        },

        findString(selector, findString, storageObjectArray) {
            let sortedArray = [];

            switch(selector) {
                case 'fullname':
                case 'faculty':
                    for (let element of storageObjectArray) {
                        if (element[selector].includes(findString)) {
                            sortedArray.push(element);
                        };
                    };
                    break;
                case 'date':
                    let findDate = findString.split('.');
                    findDate = new Date(findDate[2], findDate[1], findDate[0]);

                    for (let element of storageObjectArray) {
                        if (element[selector].getFullYear() === findDate.getFullYear() && element[selector].getMonth() === findDate.getMonth() && element[selector].getDate() === findDate.getDate()) {
                            sortedArray.push(element);
                        };
                    };
                    break;
                case 'year':
                    for (let element of storageObjectArray) {
                        if (element[selector] === findString) {
                            sortedArray.push(element);
                        };
                    };
                    break;
            };

            return sortedArray;
        },

        pullFilterSetting(typeOfFilter, elementKey, filterSettingObject) {
            return () => {
                let sortArray = StydentsStore.slice();

                if (typeOfFilter === 'sort') {
                    let activeFilter = document.getElementById(`${elementKey}-sort-btn`);
                    let filter = 'filterNone';

                    if (activeFilter.classList[1] === 'filterNone') filter = 'filterMinToMax';
                    else if (activeFilter.classList[1] === 'filterMinToMax') filter = 'filterMaxToMin';

                    activeFilter.classList.remove(activeFilter.classList[1]);
                    activeFilter.classList.add(filter);

                    delete filterSettingObject.sort[`${elementKey}-sort`];
                    filterSettingObject.sort[`${elementKey}-sort`] = [elementKey, activeFilter.classList[1]];
                } else if (typeOfFilter === 'search') {
                    filterSettingObject.find[`${elementKey}-search`] = [elementKey, document.getElementById(`${elementKey}-search-info`).value];
                }
                
                for (let property in filterSettingObject.sort) if (filterSettingObject.sort[property][1] !== 'filterNone') sortArray = TechnicalFunctions.sortStudents(filterSettingObject.sort[property][0], filterSettingObject.sort[property][1], sortArray);
                for (let property in filterSettingObject.find) if (filterSettingObject.find[property][1] !== '') sortArray = TechnicalFunctions.findString(filterSettingObject.find[property][0], filterSettingObject.find[property][1], sortArray);    

                this.removeOldItem();
                for (let element of sortArray) this.createDOMElement(element.fullname, element.faculty, element.date, element.year);
            };
        },

        removeOldItem() {
            for (let oldItem of document.querySelectorAll('.students-block')) {
                oldItem.remove();
            };
        }
    };

    {
        let filterSetting = {
            sort: {},
            find: {},
        };

        TechnicalFunctions.addOldStudents();
        document.getElementById('addStudent').addEventListener('click', TechnicalFunctions.openStudentsForm());
        document.getElementById('addBtn').addEventListener('click',  TechnicalFunctions.addNewStudent(filterSetting));

        for (let element of ['fullname', 'faculty', 'date', 'year']) {
            document.getElementById(`${element}-search-info`).addEventListener('input', TechnicalFunctions.AnimationMarkerText(element));
            document.getElementById(`${element}-sort-btn`).addEventListener('click', TechnicalFunctions.pullFilterSetting('sort', element, filterSetting));
            document.getElementById(`${element}-search-btn`).addEventListener('click', TechnicalFunctions.pullFilterSetting('search', element, filterSetting));
            document.getElementById(`${element}-search-open`).addEventListener('click', TechnicalFunctions.AnimationOpenSearchForm(element));
            document.getElementById(`${element}-close-btn`).addEventListener('click', TechnicalFunctions.AnimationCloseSearchForm(element));
        };
    };
})();