const ORDER = ["GET", "ANY", "POST", "PATCH", "PUT", "DELETE"];

export default function (m1, m2) {
    var hm1 = m1.httpMethod(),
        hm2 = m2.httpMethod();
    if (ORDER.indexOf(hm1) < ORDER.indexOf(hm2))
        return -1;
    else if (ORDER.indexOf(hm1) > ORDER.indexOf(hm2))
        return 1;
    return 0;
};