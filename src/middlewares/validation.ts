import validateVictim from "@src/models/victim/victim.schema";


const validate = (dto: string) => {

    switch (dto) {
        case 'victim':
            return validateVictim()

        default:
            return validateVictim()
    }
}

export {
    validate
}