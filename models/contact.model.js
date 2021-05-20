module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      username: String,
      password: String,
      phone: Number,
      address: String,
      isFav: {
        type: Boolean,
        default: false
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Contact = mongoose.model("contact", schema);
  return Contact;
};
