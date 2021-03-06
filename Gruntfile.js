module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		po2mo: {
			files: {
				src: 'languages/*.po',
				expand: true,
			},
		},

		pot: {
			options:{
				text_domain: 'drafts-for-friends',
				dest: 'languages/',
				keywords: [
					//WordPress localisation functions
					'__:1',
					'_e:1',
					'_x:1,2c',
					'esc_html__:1',
					'esc_html_e:1',
					'esc_html_x:1,2c',
					'esc_attr__:1',
					'esc_attr_e:1',
					'esc_attr_x:1,2c',
					'_ex:1,2c',
					'_n:1,2',
					'_nx:1,2,4c',
					'_n_noop:1,2',
					'_nx_noop:1,2,3c'
				],
			},
			files:{
				src: [
					'drafts-for-friends.php',
					'drafts-for-friends-admin-page.php'
					],
				expand: true,
			}
		},

		checktextdomain: {
			options:{
				text_domain: 'drafts-for-friends',
				correct_domain: true, // Will correct missing/variable domains
				keywords: [ // WordPress localisation functions
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				],
			},
			files: {
				src:  [ '**/*.php', ], //All php files
				expand: true,
			},
		},

	});

	grunt.loadNpmTasks('grunt-pot');
	grunt.loadNpmTasks('grunt-po2mo');
	grunt.loadNpmTasks('grunt-checktextdomain');

};