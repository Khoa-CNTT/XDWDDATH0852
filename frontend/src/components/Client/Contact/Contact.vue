<template>
    <div>
        <div class="gioithieu text-center p-2">
            <H1>Contact Us</H1>
            <p>
                We consider all the drivers of change gives you the components <br>
                you need to change to create a truly happens.
            </p>
        </div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 800px;">
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label"><b>Name</b></label>
                        <input type="name" class="form-control" id="name" placeholder="Enter your name">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label"><b>Email address</b></label>
                        <input type="email" class="form-control" id="email" placeholder="Enter your email">
                    </div>
                    <div class="mb-3">
                        <label for="subject" class="form-label"><b>Subject</b></label>
                        <input type="subject" class="form-control" id="subject" placeholder="Write a subject">
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label "><b>Message</b></label>
                        <textarea class="form-control" id="message" placeholder="Write your message"
                            style="height: 120px; padding-top: 10px;"></textarea>
                    </div>
                    <button type="submit" class="btn btn-danger w-100">Send</button>
                </form>
            </div>
        </div>
        <div class="infor-contact mt-3">
            <div class="call">
                <b>Call Us</b>
                <p style="color: red;"><b><i>0336880153</i></b></p>
            </div>
            <div class="call">
                <b>Hours</b>
                <p>Mon-Fri: 11am - 8pm <br> Sat, Sun: 9am - 10pm</p>
            </div>
            <div class="call">
                <b>Our Location:</b>
                <p>123 Bridge Street</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.infor-contact{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.infor-contact .call{
    padding: 20px 80px;
    font-size: 20px;
}
</style>