System.register([], function (exports_1, context_1) {
    "use strict";
    var CurveType, EdgePosition;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (CurveType) {
                CurveType[CurveType["CUBIC"] = 0] = "CUBIC";
                CurveType[CurveType["QUADRATIC"] = 1] = "QUADRATIC";
            })(CurveType || (exports_1("CurveType", CurveType = {})));
            (function (EdgePosition) {
                EdgePosition[EdgePosition["AFTER_DATA_POINT"] = 0] = "AFTER_DATA_POINT";
                EdgePosition[EdgePosition["AROUND_DATA_POINT"] = 1] = "AROUND_DATA_POINT";
                EdgePosition[EdgePosition["BEFORE_DATA_POINT"] = 2] = "BEFORE_DATA_POINT";
            })(EdgePosition || (exports_1("EdgePosition", EdgePosition = {})));
        }
    };
});
//# sourceMappingURL=types.js.map