
const test = (req: Object, res: any , next: Function): void => {
    res.status(200).json({controller: true, count: Math.random() * 200})
}

export default {
    test
}