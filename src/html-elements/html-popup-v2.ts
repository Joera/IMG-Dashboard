import { DataPart } from "../types/data";

export class HtmlPopupV2 {


    popupElement = document.getElementById('img-dashboard_popup');
    data = [];

    constructor(
        private element : HTMLElement,
        private description : string,
    ){
       this.create();
    }


    pop(event) {

        const popupWidth = 400;

        this.popupElement.innerHTML = '';

        // html

        if (window.innerWidth > 700) {

            const pielleke = document.createElement('div');
            pielleke.classList.add('pielleke');
            pielleke.style.width = '1.5rem';
            pielleke.style.height = '1.5rem'
            pielleke.style.position = 'absolute';
            pielleke.style.top = '-.825rem';
            pielleke.style.left = 'calc(' + (popupWidth / 2) + 'px - 0.1rem)';  // padding - width
            pielleke.style.transform = 'rotate(45deg)';
            pielleke.style.borderLeft = '1px solid black';
            pielleke.style.borderTop = '1px solid black';
            pielleke.style.background = 'white';
            this.popupElement.append(pielleke);

        }

        const description = document.createElement('div');
        description.classList.add('popup_description');
        description.innerHTML = '<div>' + this.description + '</div>';

        let span = description.querySelector('span');
        let div = description.querySelector('div.formula');

        if(span) {
          

            let dataSlug : string | number = span.getAttribute('data-slug');
            if (dataSlug == "first_column") { dataSlug = 0;}

            span.innerText = this.data[0][dataSlug].value || this.data[0][dataSlug];
        }

        if(div) {

            let el = this.formule();

            div.appendChild(el);

            setTimeout( () => { return this.populateFormula();},1000)

        }

        this.popupElement.append(description);

        // sluit knop
        const closeButton = document.createElement('div');
        closeButton.classList.add('popup_close_button');
        closeButton.style.position = 'relative';
        closeButton.style.alignSelf = 'flex-end';
        closeButton.style.marginTop = '1.5rem';
        // closeButton.style.bottom = '1.5rem';
        closeButton.onclick = () => this.close();

        closeButton.innerHTML = `
        <svg width="16px" height="16px" viewBox="0 0 91 92" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="close" fill="#000000" fill-rule="nonzero">
            <path d="M54.1,46 L88.7,11.4 C91.1,9 91.1,5.1 88.7,2.7 C86.3,0.3 82.4,0.3 80,2.7 L45.4,37.3 L10.8,2.8 C8.4,0.4 4.5,0.4 2.1,2.8 C-0.3,5.2 -0.3,9.1 2.1,11.5 L36.7,46 L2.2,80.6 C-0.2,83 -0.2,86.9 2.2,89.3 C4.6,91.7 8.5,91.7 10.9,89.3 L45.5,54.7 L80.1,89.3 C82.5,91.7 86.4,91.7 88.8,89.3 C91.2,86.9 91.2,83 88.8,80.6 L54.1,46 Z" id="Shape"></path>
            </g>
            </svg>
        `;

        this.popupElement.append(closeButton);

        if (window.innerWidth > 700) {
            // position
            var e = window.event;


        //    const rect = el.querySelector('.popup_link').getBoundingClientRect();
            this.popupElement.style.top = (44 + event.clientY + window.scrollY).toString() + 'px';
            let leftPos = event.clientX - (popupWidth / 2);
            let maxLeft = window.innerWidth - popupWidth - 60;

            // litteral edge case
            if (leftPos > maxLeft) {
                let pielleke : any = document.querySelector('.pielleke');
                pielleke.style.left = 'calc(' + ((popupWidth / 2) - (maxLeft - leftPos)) + 'px - 0.1rem)';
                leftPos = maxLeft;
            }

            this.popupElement.style.left =  leftPos.toString() + 'px';
        }

        this.popupElement.style.display = "flex";
    }

    attachData(data: DataPart[]) {
        this.data = data;
    }

    close() {

        this.popupElement.style.display = 'none';
    }

    create() {

        this.element.addEventListener( 'mouseover', (event) => {
            this.element.style.cursor = 'help'
        })

        this.element.addEventListener( 'mouseout', (event) => {
            this.element.style.cursor = 'default'
        })

        this.element.addEventListener( 'click', (event) => {  
            this.pop(event)
        })
    }

    formule() {

        let miniContainer = document.createElement('div');
        miniContainer.style.display ='flex';
        miniContainer.style.flexDirection = 'row';
        // miniContainer.style.justifyContent = 'center';
        miniContainer.style.alignItems = 'center';

        let left = document.createElement('div');
        left.style.display ='flex';
        left.style.flexDirection = 'column';
        left.style.justifyContent = 'center';
        left.style.alignItems = 'center';

        let top = document.createElement('div');
        top.classList.add('top');
        top.style.borderBottom = '1px solid black';
        top.style.paddingTop = '1.5rem';
        top.style.paddingBottom = '.75rem';

        // let w_afgehandeld = document.createElement('span');
        // w_afgehandeld.classList.add('value')
        // w_afgehandeld.classList.add('w_afgehandeld');
        // w_afgehandeld.style.display = 'inline-block';
        // w_afgehandeld.style.color = 'black';
        miniContainer.style.fontFamily = 'NotoSans Regular';
        miniContainer.style.fontWeight = 'normal';
        miniContainer.style.fontSize = '1rem';
        miniContainer.style.lineHeight = "1";

        top.innerHTML = `
      ( <span title="besluiten fysieke schade" class="top value fs_besluiten"></span> * <span title="doorlopend rapportcijfer fysieke schade" class="top value fs_cijfer"></span> )
      + ( <span title="besluiten waardedaling" class="top value w_besluiten"></span> * <span title="doorlopend rapportcijfer waardedaling" class="top value w_cijfer"></span> ) 
      + ( <span title="besluiten immateriele_schade" class="top value ims_besluiten"></span> * <span title="doorlopend rapportcijfer ims" class="top value ims_cijfer"></span> ) 
      + ( <span title="besluiten vaste_vergoeding" class="top value ves_besluiten"></span> * <span title="doorlopend rapportcijfer ves" class="top value ves_cijfer"></span> ) 
    

        `;


        left.appendChild(top);

        let bottom = document.createElement('div');
        bottom.classList.add('bottom');
        bottom.style.paddingTop = '.75rem';
        bottom.style.paddingBottom = '1.5rem';

        bottom.innerHTML = `
           <span title="besluiten fysieke schade"  class="bottom value fs_besluiten"></span> +
            <span  title="besluiten waardedaling" class="bottom value w_besluiten"></span> +
            <span  title="besluiten immateriele_schade" class="bottom value ims_besluiten"></span> +
            <span  title="besluiten vaste_vergoeding" class="bottom value ves_besluiten"></span>
        `
        left.appendChild(bottom);

        miniContainer.appendChild(left);

        let right = document.createElement('div');
        right.style.display ='flex';
        right.style.flexDirection = 'row';
        right.style.marginLeft = '.75rem';
        right.style.justifyContent = 'center';

        right.innerHTML = `= <span class="kto_result" style="margin-left:.75rem;"></span>`;

        miniContainer.appendChild(right);

        return miniContainer;
    }

    populateFormula() {

        // @ts-ignore
        let score = (
            (this.data[0].wd_besluiten * this.data[0].waardedaling_doorlopend_cijfer) 
          + (this.data[0].fs_besluiten * this.data[0].fysieke_schade_doorlopend_cijfer)
          + (this.data[0].ims_besluiten * this.data[0].ims_doorlopend_cijfer)
          + (this.data[0].ves_besluiten * this.data[0].ves_doorlopend_cijfer)
          ) 
          /   
          (
            this.data[0].wd_besluiten 
          + this.data[0].fs_besluiten
          + this.data[0].ims_besluiten
          + this.data[0].ves_besluiten
          )

        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.w_besluiten').innerText = this.data[0].wd_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.w_cijfer').innerText = this.data[0].waardedaling_doorlopend_cijfer;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.fs_besluiten').innerText = this.data[0].fs_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.fs_cijfer').innerText = this.data[0].fysieke_schade_doorlopend_cijfer;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .bottom.value.w_besluiten').innerText = this.data[0].wd_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .bottom.value.fs_besluiten').innerText = this.data[0].fs_besluiten;


        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.ims_besluiten').innerText = this.data[0].ims_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .bottom.value.ims_besluiten').innerText = this.data[0].ims_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.ims_cijfer').innerText = this.data[0].ims_doorlopend_cijfer;

        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.ves_besluiten').innerText = this.data[0].ves_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .bottom.value.ves_besluiten').innerText = this.data[0].ves_besluiten;
        // @ts-ignore
        document.querySelector('#img-dashboard_popup .top.value.ves_cijfer').innerText = this.data[0].ves_doorlopend_cijfer;


        // @ts-ignore
        document.querySelector('#img-dashboard_popup .kto_result').innerText = (Math.round(score * 100) / 100).toFixed(2);
    }

}
