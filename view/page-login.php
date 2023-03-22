<div id="site-main" class="site-main">
	<div id="main-content" class="main-content">
		<div id="primary" class="content-area">
			<div id="title" class="page-title">
				<div class="section-container">
					<div class="content-title-heading">
						<h1 class="text-title-heading">
							Login / Register
						</h1>
					</div>
					<div class="breadcrumbs">
						<a href="index.html">Home</a><span class="delimiter"></span>Login / Register
					</div>
				</div>
			</div>

			<div id="content" class="site-content" role="main">
				<div class="section-padding">
					<div class="section-container p-l-r">
						<div class="page-login-register">
							<div class="row">
								<div class="col-lg-6 col-md-6 col-sm-12 sm-m-b-50">
									<div class="box-form-login">
										<h2>Login</h2>
										<div class="box-content">
											<div class="form-login">
												<form method="post" class="login">
													<div class="username">
														<!-- <label>Username or email address <span class="required">*</span></label> -->
														<input type="text" required="required" class="input-text" name="email" id="page_email" placeholder="Your email" />

													</div>
													<div class="password">
														<!-- <label for="password">Password <span class="required">*</span></label> -->
														<input class="input-text" required="required" type="password" name="password" id="page_password" placeholder="Password" />

													</div>
													<div class="rememberme-lost">
														<div class="remember-me">
															<input name="rememberme" type="checkbox" value="forever">
															<label class="inline">Remember me</label>
														</div>
														<div class="lost-password">
															<a href="page-forgot-password.html">Lost your password?</a>
														</div>
													</div>
													<div class="button-login">
														<div class="button-form" style="background-color: black !important; color: white !important;line-height: 55px;" id="page_login">Login</div>

													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-12">
									<div class="box-form-login">
										<h2 class="register">Register</h2>
										<div class="box-content">
											<div class="form-register">
												<form method="post" class="register">
													<div class="email">
														<!-- <label>Email address <span class="required">*</span></label> -->
														<input type="email" class="input-text" placeholder="Email address" name="email" id="page_reg_email" value="" />

													</div>
													<div class="password">
														<!-- <label>Password <span class="required">*</span></label> -->
														<input type="password" class="input-text" placeholder="Password" name="password" id="page_reg_password" />

													</div>
													<div class="button-register">
														<div class="button-form" style="background-color: black !important; color: white !important;line-height: 55px;" id="page_register">REGISTER</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- #content -->
		</div><!-- #primary -->
	</div><!-- #main-content -->
</div>

<script>
    $('#page_login').click(() => {
        validateLogin('#page_email', '#page_password')
    })
    $('#register').click(() => {
        validateRegister('#page_reg_email', '#page_reg_password')
    })
    $('#page_email').on('keydown', function(e) {
        if (e.which == 13 || e.keyCode == 13) {
            $('#page_password').focus()
        }
    });

    $('#page_password').on('keydown', function(e) {
        if (e.which == 13 || e.keyCode == 13) {
            validateLogin('#page_email', '#page_password')
        }
    });

    $('#page_reg_email').on('keydown', function(e) {
        if (e.which == 13 || e.keyCode == 13) {
            $('#page_reg_password').focus()
        }
    });

    $('#page_reg_password').on('keydown', function(e) {
        if (e.which == 13 || e.keyCode == 13) {
            validateRegister('#page_reg_email', '#page_reg_password')
        }
    });
</script>