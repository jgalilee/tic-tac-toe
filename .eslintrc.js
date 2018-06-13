module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/sort-comp": 0,
        "react/forbid-prop-types": 0,
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/test/*.js", "**/*.spec.js"]}],
        "default-case": 0,
    },
    "plugins": [
        "babel"
    ],
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "describe": true,
        "it": true,
        "expect": true,
        "beforeEach": true,
        "afterEach": true,
        "mount": true,
        "shallow": true,
        "visit": true,
        "jest": true,
    }
};