/**
 * Developer Willian Takashi Ishida
 * Criado:    2021-09-08
 * Alterado:  -
 */

export function types_validation(vals: any, type_map: object, json: object): [any[], any[], {}] {
    let type_validation = [];
    let values_temp = {};
    let values = []
    let errors = {};

    Object.keys(type_map).forEach((k, i) => {
        if (k in json) {
            let uf_type = typeof json[k] == type_map[k] || json[k] == null;
            type_validation.push(uf_type);
            values_temp[k] = json[k];
            if (uf_type == false) {
                errors[k] = `O argumento foi passado com tipo '${typeof json[k]}', está incorreto! Utilize tipo '${type_map[k]}'`;
            }
        } else {
            type_validation.push(false);
            values_temp[k] = undefined
            errors[k] = `Argumento indefinido. Verifique se o argumento está correto!`;
        }
    });
    // console.log(vals)
    vals.forEach((e: any) => {
        values.push(values_temp[e])
    });

    let validation: any = any(type_validation)

    return [validation, values, errors]
}


export function any(boolean_arr: boolean[]) {
    return boolean_arr.reduce((prev, curr) => {
        return prev && curr;
    }, true);
}