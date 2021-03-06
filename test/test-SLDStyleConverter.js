var SLDStyleConverter = require('../lib/edit/style/SLDStyleConverter.js').SLDStyleConverter;
var instance = new SLDStyleConverter();

describe('SLDStyleConverter', function() {

    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
    });

    it('should convert simple types (point)', function() {
        var styleConfig = {
            "typeName": "simple",
            "symbol": {
                "size": 10,
                "shape": "circle",
                "graphic": null,
                "graphicType": null,
                "fillColor": "#ff0000",
                "fillOpacity": 80
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "dotted",
                "strokeOpacity": 90
            },
            "geomType": "point"
        };
        var style = instance.generateStyle(styleConfig, 'simple');
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:Name>simple</sld:Name><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff0000</sld:CssParameter><sld:CssParameter name="fill-opacity">0.8</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray">1 2</sld:CssParameter></sld:Stroke></sld:Mark><sld:Opacity>0.8</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
        // svg symbol (graphic)
        styleConfig = {
            "typeName": "simple",
            "symbol": {
                "size": 10,
                "shape": null,
                "graphic": "icon.svg",
                "graphicType": null,
                "fillColor": "#ff0000",
                "fillOpacity": 80
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "solid",
                "strokeOpacity": 90
            },
            "geomType": "point"
        };
        style = instance.generateStyle(styleConfig, 'simple');
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:Name>simple</sld:Name><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PointSymbolizer><sld:Graphic><sld:ExternalGraphic><sld:OnlineResource xlink:href="http://localhost:9876/icon.svg?fill=%23ff0000&amp;stroke=%23ffff00"/><sld:Format>image/svg+xml</sld:Format></sld:ExternalGraphic><sld:Opacity>0.8</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert simple types (line)', function() {
        var styleConfig = {
            "typeName": "simple line",
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "dashed",
                "strokeOpacity": 90
            },
            "geomType": "line"
        };
        var style = instance.generateStyle(styleConfig, 'simple line');
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:Name>simple line</sld:Name><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:LineSymbolizer><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray">5</sld:CssParameter></sld:Stroke></sld:LineSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert simple types (polygon)', function() {
        var styleConfig = {
            "typeName": "simple polygon",
            "symbol": {
                "fillColor": "#ff0000",
                "fillOpacity": 80
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "dashed",
                "strokeOpacity": 90
            },
            "geomType": "polygon"
        };
        var style = instance.generateStyle(styleConfig, 'simple polygon');
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:Name>simple polygon</sld:Name><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PolygonSymbolizer><sld:Fill><sld:CssParameter name="fill">#ff0000</sld:CssParameter><sld:CssParameter name="fill-opacity">0.8</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray">5</sld:CssParameter></sld:Stroke></sld:PolygonSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert labels', function() {
        var styleConfig = {
            "typeName": "simple",
            "symbol": {
                "size": 10,
                "shape": "circle",
                "graphic": null,
                "graphicType": null,
                "fillColor": "#ff0000",
                "fillOpacity": 80
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "solid",
                "strokeOpacity": 90
            },
            "label": {
                "attribute": "foo",
                "fillColor": "#000000",
                "fontFamily": "serif",
                "fontSize": 10,
                "fontStyle": "normal",
                "fontWeight": "normal"
            },
            "geomType": "point"
        };
        var style = instance.generateStyle(styleConfig, 'simple');
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:Name>simple</sld:Name><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff0000</sld:CssParameter><sld:CssParameter name="fill-opacity">0.8</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:Mark><sld:Opacity>0.8</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer><sld:TextSymbolizer><sld:Label><ogc:PropertyName>foo</ogc:PropertyName></sld:Label><sld:Font><sld:CssParameter name="font-family">Serif</sld:CssParameter><sld:CssParameter name="font-size">10</sld:CssParameter><sld:CssParameter name="font-style">normal</sld:CssParameter><sld:CssParameter name="font-weight">normal</sld:CssParameter></sld:Font><sld:LabelPlacement><sld:LinePlacement/></sld:LabelPlacement><sld:Halo><sld:Radius>1</sld:Radius><sld:Fill><sld:CssParameter name="fill">#FFFFFF</sld:CssParameter></sld:Fill></sld:Halo><sld:Fill><sld:CssParameter name="fill">#000000</sld:CssParameter></sld:Fill><sld:VendorOption name="maxDisplacement">40</sld:VendorOption><sld:VendorOption name="autoWrap">40</sld:VendorOption><sld:VendorOption name="spaceAround">0</sld:VendorOption><sld:VendorOption name="followLine">false</sld:VendorOption><sld:VendorOption name="group">yes</sld:VendorOption><sld:VendorOption name="goodnessOfFit">0.2</sld:VendorOption><sld:VendorOption name="conflictResolution">true</sld:VendorOption></sld:TextSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert unique classification', function() {
        var styleConfig = {
            "stroke": {
                "strokeColor": "#ffff00"
            },
            "geomType": "point",
            "classify": {
                "attribute": "foo"
            },
            "rules": [{
                "value": "bar",
                "style": {
                    "symbol": {
                        "fillColor": "#ff9900"
                    },
                    "stroke": {
                        "strokeColor": "#ff9900"
                    }
                }
            }, {
                "value": "baz",
                "style": {
                    "symbol": {
                        "fillColor": "#b36b00"
                    },
                    "stroke": {
                        "strokeColor": "#b36b00"
                    }
                }
            }]
        };
        var style = instance.generateStyle(styleConfig);
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>bar</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff9900</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:Mark><sld:Opacity>1</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>baz</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#b36b00</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:Mark><sld:Opacity>1</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
        styleConfig.geomType = "line";
        style = instance.generateStyle(styleConfig);
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>bar</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:LineSymbolizer><sld:Stroke><sld:CssParameter name="stroke">#ff9900</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:LineSymbolizer></sld:Rule><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>baz</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:LineSymbolizer><sld:Stroke><sld:CssParameter name="stroke">#b36b00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:LineSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
        styleConfig.geomType = "polygon";
        style = instance.generateStyle(styleConfig);
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>bar</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:PolygonSymbolizer><sld:Fill><sld:CssParameter name="fill">#ff9900</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:PolygonSymbolizer></sld:Rule><sld:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>foo</ogc:PropertyName><ogc:Literal>baz</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><sld:PolygonSymbolizer><sld:Fill><sld:CssParameter name="fill">#b36b00</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:PolygonSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert ranges of a classification', function() {
        var styleConfig = {
            "stroke": {
                "strokeColor": "#ffff00"
            },  
            "geomType": "point",
            "classify": {
                "attribute": "foo"
            },      
            "rules": [{
                "range": {
                    "min": 0,
                    "max": 10
                },  
                "style": {
                    "symbol": {
                        "fillColor": "#ff9900"
                    }   
                }   
            }, {
                "range": {
                    "min": 10,
                    "max": 20
                },
                "style": {
                    "symbol": {
                        "fillColor": "#b36b00"
                    }
                }
            }]
        };  
        var style = instance.generateStyle(styleConfig);
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><ogc:Filter><ogc:PropertyIsBetween><ogc:PropertyName>foo</ogc:PropertyName><ogc:LowerBoundary><ogc:Literal>0</ogc:Literal></ogc:LowerBoundary><ogc:UpperBoundary><ogc:Literal>10</ogc:Literal></ogc:UpperBoundary></ogc:PropertyIsBetween></ogc:Filter><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff9900</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:Mark><sld:Opacity>1</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule><sld:Rule><ogc:Filter><ogc:PropertyIsBetween><ogc:PropertyName>foo</ogc:PropertyName><ogc:LowerBoundary><ogc:Literal>10</ogc:Literal></ogc:LowerBoundary><ogc:UpperBoundary><ogc:Literal>20</ogc:Literal></ogc:UpperBoundary></ogc:PropertyIsBetween></ogc:Filter><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>circle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#b36b00</sld:CssParameter><sld:CssParameter name="fill-opacity">1</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width"/><sld:CssParameter name="stroke-opacity"/><sld:CssParameter name="stroke-dasharray"/></sld:Stroke></sld:Mark><sld:Opacity>1</sld:Opacity><sld:Size>10</sld:Size></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

    it('should convert rotation', function() {
        var styleConfig = {
            "typeName": "simple",
            "symbol": {
                "size": 10,
                "shape": "triangle",
                "graphic": null,
                "graphicType": null,
                "fillColor": "#ff0000",
                "fillOpacity": 80,
                "rotationAttribute": "rotation",
                "rotationUnits": "degrees"
            },
            "stroke": {
                "strokeColor": "#ffff00",
                "strokeWidth": 3,
                "strokeStyle": "dotted",
                "strokeOpacity": 90
            },
            "geomType": "point"
        };
        var style = instance.generateStyle(styleConfig);
        expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>triangle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff0000</sld:CssParameter><sld:CssParameter name="fill-opacity">0.8</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray">1 2</sld:CssParameter></sld:Stroke></sld:Mark><sld:Opacity>0.8</sld:Opacity><sld:Size>10</sld:Size><sld:Rotation><ogc:PropertyName>rotation</ogc:PropertyName></sld:Rotation></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');

         // now use radians
         styleConfig.symbol.rotationUnits = "radians";
         style = instance.generateStyle(styleConfig);
         expect(style).toBeXML('<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0"><sld:NamedLayer><sld:UserStyle><sld:FeatureTypeStyle><sld:Rule><sld:PointSymbolizer><sld:Graphic><sld:Mark><sld:WellKnownName>triangle</sld:WellKnownName><sld:Fill><sld:CssParameter name="fill">#ff0000</sld:CssParameter><sld:CssParameter name="fill-opacity">0.8</sld:CssParameter></sld:Fill><sld:Stroke><sld:CssParameter name="stroke">#ffff00</sld:CssParameter><sld:CssParameter name="stroke-width">3</sld:CssParameter><sld:CssParameter name="stroke-opacity">0.9</sld:CssParameter><sld:CssParameter name="stroke-dasharray">1 2</sld:CssParameter></sld:Stroke></sld:Mark><sld:Opacity>0.8</sld:Opacity><sld:Size>10</sld:Size><sld:Rotation><ogc:Div><ogc:PropertyName>rotation</ogc:PropertyName><ogc:Div><ogc:Function name="pi"/><ogc:Literal>360</ogc:Literal></ogc:Div></ogc:Div></sld:Rotation></sld:Graphic></sld:PointSymbolizer></sld:Rule></sld:FeatureTypeStyle></sld:UserStyle></sld:NamedLayer></sld:StyledLayerDescriptor>');
    });

});
