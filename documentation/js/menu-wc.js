'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">meteo-station-domotique-back-end documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-79cc09281729aff41c960c8086339767"' : 'data-target="#xs-controllers-links-module-AppModule-79cc09281729aff41c960c8086339767"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-79cc09281729aff41c960c8086339767"' :
                                            'id="xs-controllers-links-module-AppModule-79cc09281729aff41c960c8086339767"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-79cc09281729aff41c960c8086339767"' : 'data-target="#xs-injectables-links-module-AppModule-79cc09281729aff41c960c8086339767"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-79cc09281729aff41c960c8086339767"' :
                                        'id="xs-injectables-links-module-AppModule-79cc09281729aff41c960c8086339767"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HttpModule.html" data-type="entity-link">HttpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeteoHttpModule.html" data-type="entity-link">MeteoHttpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeteoModule.html" data-type="entity-link">MeteoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' : 'data-target="#xs-controllers-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' :
                                            'id="xs-controllers-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' }>
                                            <li class="link">
                                                <a href="controllers/MeteoController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeteoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' : 'data-target="#xs-injectables-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' :
                                        'id="xs-injectables-links-module-MeteoModule-de7e669cc59fdf04a4d1dc21837943c7"' }>
                                        <li class="link">
                                            <a href="injectables/MeteoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MeteoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StationHttpModule.html" data-type="entity-link">StationHttpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StationModule.html" data-type="entity-link">StationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' : 'data-target="#xs-controllers-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' :
                                            'id="xs-controllers-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' }>
                                            <li class="link">
                                                <a href="controllers/StationController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' : 'data-target="#xs-injectables-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' :
                                        'id="xs-injectables-links-module-StationModule-7ad5aa579724a70de9c39b10a2f0e35d"' }>
                                        <li class="link">
                                            <a href="injectables/StationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatsModule.html" data-type="entity-link">StatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' : 'data-target="#xs-controllers-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' :
                                            'id="xs-controllers-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' }>
                                            <li class="link">
                                                <a href="controllers/StatsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' : 'data-target="#xs-injectables-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' :
                                        'id="xs-injectables-links-module-StatsModule-cdbd93c78135e9303bb897d1f2810752"' }>
                                        <li class="link">
                                            <a href="injectables/StatsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MeteoController.html" data-type="entity-link">MeteoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StationController.html" data-type="entity-link">StationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StatsController.html" data-type="entity-link">StatsController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/City.html" data-type="entity-link">City</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ephemeride.html" data-type="entity-link">Ephemeride</a>
                            </li>
                            <li class="link">
                                <a href="classes/Forecast.html" data-type="entity-link">Forecast</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hello.html" data-type="entity-link">Hello</a>
                            </li>
                            <li class="link">
                                <a href="classes/Measurement.html" data-type="entity-link">Measurement</a>
                            </li>
                            <li class="link">
                                <a href="classes/Meteo.html" data-type="entity-link">Meteo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoStats.html" data-type="entity-link">MeteoStats</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link">LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeteoService.html" data-type="entity-link">MeteoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StationService.html" data-type="entity-link">StationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatsService.html" data-type="entity-link">StatsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/SwitchState.html" data-type="entity-link">SwitchState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});