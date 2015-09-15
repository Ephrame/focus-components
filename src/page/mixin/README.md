# Le CartridgeBehaviour

Ce mixin, permet la création d'un entête particulier à une page via la fonction `cartridgeConfiguration()`.
L'atoût de cet entête est de diminuer lorsque l'on descend sur la page. 

[Animation de diminution de l'entête] (enteteGif.gif)

La fonction `cartridgeConfiguration()` doit renvoyer un objet de quatre éléments : 
* summary : {component : "React Component", props : {}} : composant lorsque l'entête est réduit
* cartridge : {component : "React Component", props : {}} : composant lorsque l'entête est entier.
* barleft : {component : "React Component", props : {}} : composant en haut à gauche de la page.
* actions : { primary :  , secondary : } : Les actions primaires sont celles qui seront affichées via un bouton, les actions secondaires seront affichées sous forme de liste. 

[L'entête Focus](enteteImage.png)

__Exemple d'implémentation__

Afin de réaliser ces exemples, la cas d'une page utilisateur d'un espace personnel (par exemple) a été priviligié.

``` javascript
    cartridgeConfiguration() {
        return {
            summary: {component: UserSummary},
            cartridge: {component: UserCartrige},
            barLeft: {component: Focus.components.common.button.back.component},
            actions: {
                primary: [
                    {label: 'imprimer', action: ()=>{ /*écrire une action*/ }, icon: 'print'},
                    {label: 'archiver', action: ()=>{/*écrire une action*/  }, icon: 'archive'}
                ],
                secondary: [
                    {label: 'exporter', action: ()=>{/*écrire une action*/ }},
            }
        };
    },
```
Les composants `UserSummary` et `UserCartrige` sont alors des composants React créés dans le même dossier que le fichier `index.jsx`.
Afin d'afficher un titre à la page de détail , par exemple, le fichier UserCatridge peut être construit ainsi : 

``` javascript
    module.exports = React.createClass({
        displayName: 'UserCartridge',
        render() {
            return (
                <div className='cartridge-user'>
                    <div className='summary'>
                        <h1 className='title'>Espace personnel Utilisateur</h1>
                    </div>
                </div>
            );
        }
    });
```

__Astuce :__
Afin d'avoir un titre qui prend en compte les données relatives à l'utilisateur, il suffit d'ajouter au fichier `UserSummary` et `UserCartridge` le mxin permettant la création d'un formulaire et les éléments nécéssaires au fonctionnement de ce mixin (cf. Documentation sur le formMixin). Et d'ajouter aux `props` des deux composants, dans la fonction `cartridgeConfiguration()`, l'id et la proprieté `hasform` à `false` (afin d'effectuer qu'une lecture des données) : 
``` javascript
    cartridge: {component: UserSummary, props : {id: this.props.id, hasform : false}},
```
Voici un exemple du fichier `UserSummary` dans ce cas : 
``` javascript
    // Stores
    let userStore = require('stores/user');
    // Mixins
    let formMixin = Focus.components.common.form.mixin;
    // Actions
    let userActions = require('action/user').user;
    module.exports = React.createClass({
        definitionPath: 'user',
        displayName: 'UserSummary',
        mixins: [formMixin],
        stores: [{store: userStore, properties: ['user']}],
        action: userActions,
    
        renderContent() {
            return <h2>Espace personnel de {this.textFor('Name')}</h2>;
        }
    });
```


