export default {
    components: [
        {
            name: 'Navigation View',
            description: 'A view holding navigation items',
            component: 'navigationView',
            children: [
                {
                    name: 'Something',
                    description: 'Blah',
                    component: ''
                }
            ]
        },
        {
            name: 'Pivot',
            description: 'Pivot can be used for navigtational purposes on a page, typically subb navigation. A good use case could be for navigating different filters',
            component: 'pivot'
        }

    ]
}
