"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tour = exports.TourType = void 0;
var TourType;
(function (TourType) {
    TourType["ATP"] = "atp";
    TourType["WTA"] = "wta";
})(TourType = exports.TourType || (exports.TourType = {}));
function tour(req, res, next) {
    try {
        if (!req.params.type) {
            return next();
        }
        const tourType = req.params.type;
        if (tourType === TourType.ATP || tourType === TourType.WTA) {
            return next();
        }
        throw new Error("Wrong type!");
    }
    catch (err) {
        return res.json({ error: err.message });
    }
}
exports.tour = tour;
;
//# sourceMappingURL=tour.middleware.js.map