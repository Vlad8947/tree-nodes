import React, {Component} from 'react';
import {SplitButton} from 'primereact/splitbutton';
import {OverlayPanel} from 'primereact/overlaypanel';

export class AddSplitButton extends Component {

    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'Change',
                    icon: 'pi-pencil',
                    command: (e) => {
                        this.op.toggle(e)
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi-trash',
                    command: (e) => {

                    }
                }
            ]
        }
    }
}