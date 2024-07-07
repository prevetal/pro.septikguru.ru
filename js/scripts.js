WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Solutions slider
	const solutionsSliders = [],
		solutions = document.querySelectorAll('.solutions .swiper')

	solutions.forEach((el, i) => {
		el.classList.add('solutions_s' + i)

		let options = {
			loop: true,
			speed: 500,
			autoHeight: true,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$(swiper.el).find('.thumbs .btn').removeClass('active')
						$(swiper.el).find('.thumbs .btn').eq(swiper.realIndex).addClass('active')
					})
				}
			}
		}

		solutionsSliders.push(new Swiper('.solutions_s' + i, options))

		$('.solutions .thumbs .btn').click(function (e) {
			e.preventDefault()

			solutionsSliders[i].slideTo($(this).data('slide-index'), 500)
		})
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				$('header .menu_btn').removeClass('active')
				$('body').removeClass('lock')
				$('.menu_modal').removeClass('show')
				$('.overlay').fadeOut(200)

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Mob. menu
	$('header .menu_btn, .menu_modal .close_btn, .overlay, header .mob_menu_btn').click(e => {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.menu_modal').toggleClass('show')

		$('header .menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Phone input
	const inputs = document.querySelectorAll('input[type=tel]')

	inputs.forEach(el => window.intlTelInput(el, {
		initialCountry: 'ru',
		strictMode: true,
		separateDialCode: true
	}))


	// Quiz
	let currentStep = 1,
		totalStep = 3

	$('.quiz .step .answers label').click(function(e) {
		if (e.target.nodeName === 'LABEL') {
			quizGoToNext()
		}
	})


	$('.quiz .next_btn').click(function(e) {
		e.preventDefault()

		quizGoToNext()
	})


	$('.quiz .prev_btn').click(function(e) {
		e.preventDefault()

		quizGoToPrev()
	})


	function quizGoToNext() {
		currentStep++

		// Hide step
		$('.quiz .step_head, .quiz .step').hide()

		// Show step
		$(`.quiz .step${currentStep}_head`).css('display', 'flex')
		$(`.quiz .step${currentStep}`).fadeIn(300)

		// Prev btn
		currentStep > 1
		? $('.quiz .btns .prev_btn').fadeIn(300)
		: $('.quiz .btns .prev_btn').fadeOut(200)

		// Finish
		if (currentStep > totalStep) {
			$('.quiz').addClass('finish')
		} else {
			// Progress
			$('.quiz .head .progress .bar').css('width', 100 / totalStep * currentStep + '%')
		}
	}


	function quizGoToPrev() {
		currentStep = currentStep - 1

		// Hide step
		$('.quiz .step_head, .quiz .step').hide()

		// Show step
		$(`.quiz .step${currentStep}_head`).css('display', 'flex')
		$(`.quiz .step${currentStep}`).fadeIn(300)

		// Progress
		$('.quiz .head .progress .bar').css('width', 100 / totalStep * currentStep + '%')

		// Prev btn
		currentStep > 1
			? $('.quiz .btns .prev_btn').fadeIn(300)
			: $('.quiz .btns .prev_btn').fadeOut(200)
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})