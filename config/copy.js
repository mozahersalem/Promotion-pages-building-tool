module.exports.tasks = {
    copy: {

        // copy app/img to dist/unmin/img
        assets_dev: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'app/assets/', // Src matches are relative to this path.
                src: ['**'], // Actual pattern(s) to match.
                dest: 'dist/unmin/assets', // Destination path prefix.
            }],
        },

        // copy app/img to dist/min/img
        assets_build: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'app/assets/', // Src matches are relative to this path.
                src: ['**'], // Actual pattern(s) to match.
                dest: 'dist/min/assets', // Destination path prefix.
            }],
        },

        assets_to_FINAL_UPLOADS: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'app/assets', // Src matches are relative to this path.
                src: ['**'], // Actual pattern(s) to match.
                dest: '_FINAL_UPLOADS/assets', // Destination path prefix.
            }],
        },
        
        // copy dist/umnin to _FINAL_UPLOADS
        unmin_folder: { 
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'dist/', // Src matches are relative to this path.
                src: ['unmin/**'], // Actual pattern(s) to match.
                dest: '_FINAL_UPLOADS/', // Destination path prefix.
            }],
        },
        // copy dist/min to _FINAL_UPLOADS
        min_folder: { 
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'dist/min/html_min', // Src matches are relative to this path.
                src: ['**'], // Actual pattern(s) to match.
                dest: '_FINAL_UPLOADS/min', // Destination path prefix.
            }],
        },

        html_embed: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'dist/min', // Src matches are relative to this path.
                src: ['embed/**'], // Actual pattern(s) to match.
                dest: '_FINAL_UPLOADS/', // Destination path prefix.
            }],
        },

        less_responsive: {
            files: [{
                expand: true, // Enable dynamic expansion.
                cwd: 'app/less/', // Src matches are relative to this path.
                src: ['style.less', 'pages/*', 'partials/*'], // Actual pattern(s) to match.
                dest: 'app/less/responsive/small', // Destination path prefix.
            }, {
                expand: true, // Enable dynamic expansion.
                cwd: 'app/less/', // Src matches are relative to this path.
                src: ['style.less', 'pages/*', 'partials/*'], // Actual pattern(s) to match.
                dest: 'app/less/responsive/meduim', // Destination path prefix.
            }],

        },

    },

}