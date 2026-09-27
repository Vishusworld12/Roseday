from marshmallow import Schema, fields,validate






# add rose
class RoseSchema(Schema):
    title= fields.String(required=True,error_messages={
        "required":"Rose Title is required"
    })
    desc = fields.String(required=True, validate=validate.Length(min=10, error="Rose Description length should be greater than 10 characters"), error_messages={
        "required": "Rose desc is required"
    })

    image= fields.String(required=True,error_messages={
            "required":"Rose image is required"
    })
# update rose 
class UpdateRoseSchema(Schema):
    title= fields.String(required=True,error_messages={
        "required":"Rose Title is required"
    })
    desc = fields.String(required=True, validate=validate.Length(min=10, error="Rose Description length should be greater than 10 characters"), error_messages={
        "required": "Rose desc is required"
    })

    image= fields.String(required=True,error_messages={
            "required":"Rose image is required"
    })

# instance of marshmallow

rose_schema = RoseSchema()
update_rose_schema = UpdateRoseSchema()
