import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Tree} from 'primereact/tree';
import {Dialog} from 'primereact/dialog';
import {OverlayPanel} from 'primereact/overlaypanel';
import {ContextMenu} from 'primereact/contextmenu';
import {Growl} from 'primereact/growl';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'

class App extends Component {

    constructor() {
        super();
        this.state = {
            nodes: [
                {
                    "key": "20",
                    "label": "Documents",
                    "data": "Documents Folder",
                    "icon": "pi pi-fw pi-inbox",
                    "children": [{
                        "key": "0-0",
                        "label": "Work",
                        "data": "Work Folder",
                        "icon": "pi pi-fw pi-cog",
                        "children": [{
                            "key": "0-0-0",
                            "label": "Expenses.doc",
                            "icon": "pi pi-fw pi-file",
                            "data": "Expenses Document"
                        }, {
                            "key": "0-0-1",
                            "label": "Resume.doc",
                            "icon": "pi pi-fw pi-file",
                            "data": "Resume Document"
                        }]
                    },
                        {
                            "key": "0-1",
                            "label": "Home",
                            "data": "Home Folder",
                            "icon": "pi pi-fw pi-home",
                            "children": [{
                                "key": "0-1-0",
                                "label": "Invoices.txt",
                                "icon": "pi pi-fw pi-file",
                                "data": "Invoices for this month"
                            }]
                        }]
                },
                {
                    "key": "15",
                    "label": "Events",
                    "data": "Events Folder",
                    "icon": "pi pi-fw pi-calendar",
                    "children": [
                        {"key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting"},
                        {
                            "key": "1-1",
                            "label": "Product Launch",
                            "icon": "pi pi-fw pi-calendar-plus",
                            "data": "Product Launch"
                        },
                        {
                            "key": "1-2",
                            "label": "Report Review",
                            "icon": "pi pi-fw pi-calendar-plus",
                            "data": "Report Review"
                        }]
                },
                {
                    "key": "2",
                    "label": "Movies",
                    "data": "Movies Folder",
                    "icon": "pi pi-fw pi-star",
                    "children": [{
                        "key": "2-0",
                        "icon": "pi pi-fw pi-star",
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{
                            "key": "2-0-0",
                            "label": "Scarface",
                            "icon": "pi pi-fw pi-video",
                            "data": "Scarface Movie"
                        }, {"key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "Serpico Movie"}]
                    },
                        {
                            "key": "2-1",
                            "label": "Robert De Niro",
                            "icon": "pi pi-fw pi-star",
                            "data": "De Niro Movies",
                            "children": [{
                                "key": "2-1-0",
                                "label": "Goodfellas",
                                "icon": "pi pi-fw pi-video",
                                "data": "Goodfellas Movie"
                            }, {
                                "key": "2-1-1",
                                "label": "Untouchables",
                                "icon": "pi pi-fw pi-video",
                                "data": "Untouchables Movie"
                            }]
                        }]
                }
            ],
            selectedNodeKey: null,
            selectedNode: null,
            addNodeName: null,
            changeNodeVisible: false,
            addNodeVisible: false,
            nodeMenu: [
                {
                    label: 'Add folder into',
                    icon: 'pi pi-plus',
                    command: (e) => {
                        this.setState({addNodeVisible: true});
                    }
                },
                {
                    label: 'Change label',
                    icon: 'pi pi-pencil',
                    command: (e) => {
                        this.setState({changeNodeVisible: true});
                    }
                },
                {
                    label: 'Delete folder',
                    icon: 'pi pi-trash',
                    command: (e) => {
                        this.deleteFolder(e)
                    }
                }
            ]
        };
        let nodes = this.initNodes(this.state.nodes, null);
    }

    initNodes(nodes, parentKey) {
        if (nodes) {
            let node;
            for (let i = 0; i < nodes.length; i++) {
                node = nodes[i];
                node.key = (parentKey != null) ? (parentKey + "-" + i) : i.toString();
                node.icon = "pi pi-folder";
                this.initNodes(node.children, node.key);
            }
        }
    }

    findNodeByKey(key) {
        if (key != null) {
            let keys = key.split('-');
            let node = this.state.nodes[keys[0]];
            for (let i = 1; i < keys.length-1; i++) {
                node = node[keys[i]];
            }
            return node;
        }
    }

    addFolder(event) {
        let selectedNode = this.state.selectedNode;
        this.growl.show({severity: 'info', summary: 'Node Selected', detail: selectedNode.key});

        let nodeKey = selectedNode.key + "-" + selectedNode.children.length;
        selectedNode.children.push({
            key: nodeKey,
            label: this.state.addNodeName,
            icon: "pi pi-folder",
        });
        this.setState({nodes: this.state.nodes});
        this.setState({addNodeName: ""});
        this.setState({addNodeVisible: false})
    }

    addFolderToRoot() {
        let nodes = this.state.nodes;
        let nodeKey = nodes.length.toString();
        nodes.push({
            key: nodeKey,
            label: this.state.addNodeName,
            icon: "pi pi-folder",
        });
        this.setState({nodes: this.state.nodes});
        this.setState({addNodeName: ""});
    }

    deleteFolder(event) {
        let nodes = this.state.nodes;
        let nodeKey = this.state.selectedNodeKey;
        if (nodeKey == null) {
            return;
        }
        let indexes = nodeKey.split('-');
        let parentNode = this.state.nodes;
        let childIndex = indexes[0];
        for (let i = 0; i < indexes.length-1; i++) {
            parentNode = parentNode[childIndex].children;
            childIndex = indexes[i+1];
        }
        parentNode.splice(childIndex,1);
        this.initNodes(nodes, null);
        this.setState({nodes: nodes});
    }

    onDrugAndDrop(e) {
        this.setState({selectedNodeKey: null});
        let nodes = e.value;
        this.initNodes(nodes, null);
        this.setState({nodes: nodes});
    }

    onSelect(event) {
        let key = event.value;
        this.setState({selectedNodeKey: key});
        let node = this.findNodeByKey(key);
        this.growl.show({severity: 'info', summary: 'Node Selected', detail: node.key});
        this.setState({selectedNode: node});
    }

    downloadChildren(node) {
        if (node != null) {
            //todo заглушка для прогрузки
            const children = node.children;
            node.children = [];
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(children);
                }, 2000);
            });
        }
    }

    setIcon(node, icon) {
        node.icon = icon;
        this.setState({nodes: this.state.nodes});
    }

    async setChildren(event) {
        const node = event.node;
        //todo заглушка для прогрузки
        let isNonChildren = true;
        if (isNonChildren) {
            let spinnerIcon = "pi pi-spin pi-spinner";
            let folderIcon = "pi pi-folder";
            this.setIcon(node, spinnerIcon);
            const children = await this.downloadChildren(node);
            node.children = children;
            this.setIcon(node, folderIcon);
        }
    }

    onExpand(event) {
        this.setChildren(event);
    }

    render() {
        const addNodeFooter = (
            <div>
                <Button icon="pi pi-check" onClick={e => this.addFolder(e)}
                        disabled={(this.state.addNodeName == null || this.state.addNodeName.trim().length == 0) ? "disabled" : ""} />
            </div>
        );

        const changeNodeFooter = (
            <div>
                <Button icon="pi pi-check" onClick={e => this.setState({changeNodeVisible: false})}
                        disabled={(this.state.selectedNode == null || this.state.selectedNode.label.trim().length == 0) ? "disabled" : ""} />
            </div>
        );

        return (
            <div className="App">
                <div className="App-header p-grid p-align-center">

                    <div id="add-folder" className="p-col-fixed">
                        <Button className="p-button-secondary" label={"Add folder in the root"} icon={"pi pi-plus-circle"}
                                onClick={(e) => this.addOP.toggle(e)} />

                        <OverlayPanel ref={(e) => this.addOP = e} showCloseIcon={true}>
                            <div className="p-inputgroup">
                                <InputText label="Folder name" type="text" size="30"
                                           value={this.state.addNodeName}
                                           onChange={(e) => this.setState({addNodeName: e.target.value})}/>
                                <Button label="Add" onClick={e => this.addFolderToRoot(e)}
                                        disabled={(this.state.addNodeName == null || this.state.addNodeName.trim().length == 0) ? "disabled" : ""}/>
                            </div>
                        </OverlayPanel>
                    </div>

                    <div className="p-col-fixed">
                        <span>To open the folder menu, right-click on the folder.</span>
                    </div>

                </div>
                <div className="App-intro">
                    <Growl ref={(el) => this.growl = el}/>

                    <div className="content-section implementation">

                        <ContextMenu model={this.state.nodeMenu} ref={el => this.nodeContMenu = el} />

                        <Dialog header="Enter a label of a New Folder" visible={this.state.addNodeVisible}
                                footer={addNodeFooter} onHide={e => this.setState({addNodeVisible: false})} >

                            <InputText label="Enter a label for New Folder" type="text" size="30"
                                       value={this.state.addNodeName}
                                       onChange={e => this.setState({addNodeName: e.target.value})} />
                        </Dialog>

                        <Dialog header="Change folder name" visible={this.state.changeNodeVisible} showHeader={false}
                                footer={changeNodeFooter} >

                            <InputText label="Folder name" type="text" size="30"
                                       value={ (this.state.selectedNode != null) ? this.state.selectedNode.label : ""}
                                       onChange={e => {
                                           let node = this.findNodeByKey(this.state.selectedNodeKey);
                                           if (node != null) {
                                               node.label = e.target.value;
                                               this.setState({nodes: this.state.nodes})
                                           }
                                       }}
                            />
                        </Dialog>

                        <Tree value={this.state.nodes} selectionMode={"single"}
                              selectionKeys={this.state.selectedNodeKey}
                              onSelectionChange={e => this.onSelect(e)}
                              dragdropScope="demo"
                              onDragDrop={e => this.onDrugAndDrop(e)}
                              onContextMenuSelectionChange={e => this.onSelect(e)}
                              onContextMenu={event => this.nodeContMenu.show(event.originalEvent)}
                              onExpand={e => this.onExpand(e)}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
